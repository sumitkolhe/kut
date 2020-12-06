import express from "express";
import { authRoutes } from "../services/routes/auth.routes";
import { controllerRoutes } from "../services/routes/controller.routes";

const routes = express.Router();

routes.use("/api/auth", authRoutes);
routes.use("/api/shorten", controllerRoutes);

export default routes;
