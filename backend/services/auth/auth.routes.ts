import express from "express";
import { login } from "./login";
import { register } from "./register";

const authRoutes = express.Router();

authRoutes.post("/login", login);
//authRoutes.post("/login", login);
authRoutes.post("/register", register);

export default authRoutes;
