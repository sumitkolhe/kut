import mongoose from "mongoose";
import { config } from "../../config";

export const connectDatabase = () => {
  mongoose
    .connect(config.MONGO_URL, {
      dbName: "user_data",
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => {
      console.log("Connected To Database");
    })
    .catch((err) => {
      console.log(err.message);
    });
};
