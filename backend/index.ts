import express from "express";
import useragent from "express-useragent";
//import createError from "http-errors";
import { routes } from "@routes/routes";
import { config } from "@config/config";
import { connectDatabase } from "@utils/database";
import { errorHandler } from "@middleware/errorHandler";
import { setHeaders } from "@middleware/header";

const app = express();
connectDatabase();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(useragent.express());
app.use(setHeaders);
app.use(routes);
app.use(
  (
    err: express.ErrorRequestHandler,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => errorHandler(err, req, res, next)
);

app.listen(config.PORT, () =>
  console.log(`Server started on port ${config.PORT}`)
);
