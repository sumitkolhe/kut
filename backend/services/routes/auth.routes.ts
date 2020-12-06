import express from "express";
import { login } from "../auth/login";
import { register } from "../auth/register";

export const authRoutes = () => {
  express.Router().post("/login", login);
  express.Router().post("/register", register);
};
