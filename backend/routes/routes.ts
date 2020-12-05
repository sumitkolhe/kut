import express from "express";
import authRoutes from "../services";

const routes = express.Router();

routes.use("/auth", authRoutes);

export default routes;
