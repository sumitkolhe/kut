import express from "express";
import createError from "http-errors";
import routes from "./routes/routes";
import useragent from "express-useragent";
import { config } from "../config";
import { connectDatabase } from "./utils/database";
import { errorHandler } from "./middleware/errorHandler";
import { setHeaders } from "./middleware/header";

const app = express();
connectDatabase();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(useragent.express());
app.use(setHeaders);
app.use(routes);
app.use((next: express.NextFunction) => {
  next(createError(404, "Not Found"));
});
app.use(errorHandler);

app.listen(config.PORT, () =>
  console.log(`Server started on port ${config.PORT}`)
);
