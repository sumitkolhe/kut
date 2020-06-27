const express = require("express");
const app = express();
const mongoose = require("mongoose");
const redirect = require("./routes/redirect");
const check = require("./routes/check");
const shorten = require("./routes/shorten");
const rateLimiter = require("express-rate-limit");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

//MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Ratelimiter
const limit = rateLimiter({
  windowMs: 1 * 60 * 1000,
  max: 10,
});

//Connect To Databse
mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  () => {
    console.log("Connected to Database");
  }
);

//Routes
app.use("/", redirect);
app.get("/api/status", (req, res) => {
  res.status(200).json({ status: "OK" });
});
app.use("/api/shorten", limit, shorten);
app.use("/api/check", limit, check);

// Handle production Static folder
app.use(express.static(__dirname + "/static/"));

// Handle SPA
app.get("/dashboard", (req, res) =>
  res.sendFile(__dirname + "/static/index.html")
);
app.get(/.*/, (req, res) => res.sendFile(__dirname + "/errors/error.html"));

const port = process.env.PORT || 80;

app.listen(port, () => console.log(`Server started on port ${port}`));
