import createError from "http-errors";
import { RequestHandler } from "express";

export const analytics: RequestHandler = async (_req, res, next) => {
  try {
    res.json("analytics");
  } catch (err) {
    next(new createError.InternalServerError());
  }
};
