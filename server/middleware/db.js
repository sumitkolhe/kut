const mongoose = require("mongoose");

//Connect To Production Database
mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  () => {
    console.log("Connected [Production] | collection => links");
  }
);
