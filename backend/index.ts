import express, { Application } from "express";
import { config } from "../config";
import routes from "./routes/routes";
import { connectDatabase } from "./utils/database";
const app: Application = express();

connectDatabase();

//MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

app.listen(config.PORT, () =>
  console.log(`Server started on port ${config.PORT}`)
);
