import express from "express";

const authRoutes = express.Router();

authRoutes.get("/login");

export default authRoutes;
