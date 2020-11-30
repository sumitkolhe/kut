const { RateLimiterMongo } = require("rate-limiter-flexible");
const mongoose = require("mongoose");
require("dotenv").config();

const mongoOpts = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

var mongoConnection = mongoose.createConnection(
  process.env.MONGO_URL,
  mongoOpts
);

mongoConnection.on("connected", () => {
  console.log("Connected [Production] | collection => limits");
});

const opts = {
  mongo: mongoConnection,
  storeClient: mongoConnection,
  keyPrefix: "limits",
  points: 5, // total points available
  duration: 60, //in seconds
};

const rateLimiterMongo = new RateLimiterMongo(opts);

async function limitchecker(req, res, next) {
  await rateLimiterMongo
    .consume(req.ip, 1) //consumes 1 point
    .then(() => {
      next();
    })
    .catch(() => {
      res.status(429).end();
    });
}

module.exports = limitchecker;
