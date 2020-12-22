import { me } from "../auth/me";
import express from "express";
import { login } from "../auth/login";
import { register } from "../auth/register";
import { verifyToken } from "../../middleware/verifyToken";

const router = express.Router();

export const authRoutes = {
  me: router.get("/me", verifyToken, me),
  login: router.post("/login", login),
  register: router.post("/register", register),
};
