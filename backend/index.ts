import express from "express";
import createError from "http-errors";
import route from "./routes/route";
import useragent from "express-useragent";
import { config } from "../config";
import { connectDatabase } from "./utils/database";
import { errorHandler } from "./middleware/errorHandler";

const app = express();
connectDatabase();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(useragent.express());
app.use(route);
app.use((next: express.NextFunction) => {
  next(createError(404, "Not Found"));
});
app.use(errorHandler);

app.listen(config.PORT, () =>
  console.log(`Server started on port ${config.PORT}`)
);
