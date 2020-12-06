import express from "express";
import routes from "./routes/routes";
import createError from "http-errors";
import { config } from "../config";
import { connectDatabase } from "./utils/database";
import { errorHandler } from "./middleware/error";
import { verifyToken } from "./utils/token";

const app = express();
connectDatabase();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/",verifyToken,(req: express.Request, res: express.Response) => {
  res.send(req.body);
});

app.use(routes);

app.use(
  (
    _req: express.Request,
    _res: express.Response,
    next: express.NextFunction
  ) => {
    next(createError(404, "Not Found"));
  }
);

app.use(errorHandler);

app.listen(config.PORT, () =>
  console.log(`Server started on port ${config.PORT}`)
);
