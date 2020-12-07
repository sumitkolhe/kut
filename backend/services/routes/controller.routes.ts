import express from "express";
import { redirect } from "../controller/redirect";
import { shorten } from "../controller/shorten";
import { verifyToken } from "../../middleware/verifyToken";

const router = express.Router();

export const controllerRoutes = {
  shorten: router.post("/shorten",verifyToken, shorten),
  redirect: router.get("/:alias", redirect),
};
