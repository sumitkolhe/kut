import express from "express";
import Jwt from "jsonwebtoken";
import createError from "http-errors";
import { config } from "../../config";

export const verifyToken = (
  req: express.Request,
  _res: express.Response,
  next: express.NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const authToken = authHeader && authHeader.split(" ")[1];
  if (!authToken) throw new createError.Forbidden();

  try {
    const tokenDetails = Jwt.verify(authToken, config.ACCESS_TOKEN_SECRET);
    req.body.auth = tokenDetails;

    next();
  } catch (error) {
    throw new createError.NotFound("Authorization token invalid");
  }
};
