import express from "express";
import { authRoutes } from "../services/routes/auth.routes";
import { controllerRoutes } from "../services/routes/controller.routes";

const routes = express.Router();

routes.use("/", controllerRoutes.redirect);
routes.use("/api/", controllerRoutes.shorten);
routes.use("/api/", controllerRoutes.analytics);
routes.use("/api/auth", authRoutes.login);
routes.use("/api/auth", authRoutes.register);

export default routes;
