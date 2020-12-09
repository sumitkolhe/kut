import express from "express";
import { redirect } from "../controller/redirect";
import { shorten } from "../controller/shorten";
import { verifyToken } from "../../middleware/verifyToken";
import { analytics } from "../controller/analytics";
import { userAgent } from "../../middleware/userAgent";

const router = express.Router();

export const controllerRoutes = {
  redirect: router.get("/:alias", userAgent, redirect),
  shorten: router.post("/shorten", verifyToken, shorten),
  analytics: router.post("/analytics", verifyToken, analytics),
};
