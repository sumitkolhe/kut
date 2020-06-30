const { RateLimiterMongo } = require("rate-limiter-flexible");
const mongoose = require("mongoose");
require("dotenv").config();

const mongoOpts = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

if (process.env.NODE_ENV === "production") {
  var mongoConnection = mongoose.createConnection(
    process.env.MONGO_PROD_URL,
    mongoOpts
  );

  mongoConnection.on("connected", () => {
    console.log("Connected to MongoDB Production -> limits");
  });
} else if (process.env.NODE_ENV === "development") {
  var mongoConnection = mongoose.createConnection(
    process.env.MONGO_DEV_URL,
    mongoOpts
  );

  mongoConnection.on("connected", () => {
    console.log("Connected to MongoDB Development -> limits");
  });
}

const opts = {
  mongo: mongoConnection,
  storeClient: mongoConnection,
  keyPrefix: "limits",
  points: 5,  // total points available
  duration: 60, //in seconds
};

const rateLimiterMongo = new RateLimiterMongo(opts);

async function limitchecker(req, res,next) {
  await rateLimiterMongo
    .consume(req.ip, 1) //consumes 1 point 
    .then(() => {
     next();
    })
    .catch((rateLimiterRes) => {
      res.status(429).end();
    });
}



module.exports = limitchecker;
