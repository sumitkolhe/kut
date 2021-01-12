import express from "express";
import { me } from "@controller/auth/me";
import { login } from "@controller/auth/login";
import { register } from "@controller/auth/register";
import { verifyToken } from "@middleware/verify-token";

const router = express.Router();

export const authRoutes = {
  me: router.get("/me", verifyToken, me),
  login: router.post("/login", login),
  register: router.post("/register", register),
};
