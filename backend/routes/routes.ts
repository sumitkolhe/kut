import express from "express";
import authRoutes from "../services";

const router = express.Router();

router.use("/auth", authRoutes);

export default router;
