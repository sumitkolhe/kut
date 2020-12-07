import express from "express";
import { login } from "../auth/login";
import { register } from "../auth/register";

const router = express.Router();

export const authRoutes = {
  login: router.post("/login", login),
  register: router.post("/register", register),
};
