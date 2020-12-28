import express from "express";
import { redirect } from "@controller/services/redirect";
import { shorten } from "@controller/services/shorten";
import { verifyToken } from "@middleware/verifyToken";
import { analytics } from "@controller/services/analytics";
import { userAgent } from "@middleware/userAgent";
import { links } from "@controller/services/links";

const router = express.Router();

export const controllerRoutes = {
  links: router.get("/links", verifyToken, links),
  redirect: router.get("/:alias", userAgent, redirect),
  shorten: router.post("/shorten", verifyToken, shorten),
  analytics: router.post("/analytics", verifyToken, analytics),
};
