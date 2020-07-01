const mongoose = require("mongoose");

//Connect To Production Database
if (process.env.NODE_ENV === "production") {
  mongoose.connect(
    process.env.MONGO_PROD_URL,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
    () => {
      console.log("Connected to MongoDB Production -> links");
    }
  );
} else if (process.env.NODE_ENV === "development") {
  //Connect To Devlopment Database
  mongoose.connect(
    process.env.MONGO_DEV_URL,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
    () => {
      console.log("Connected to MongoDB Development -> links");
    }
  );
}



