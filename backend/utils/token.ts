import Jwt from "jsonwebtoken";
import express from "express";
import createError from "http-errors";
import { config } from "../../config";

export const signToken = (data: any) => {
  const signedToken = Jwt.sign(data, config.ACCESS_TOKEN_SECRET, {
    expiresIn: config.ACCESS_TOKEN_EXPIRATION,
  });

  return signedToken;
};

export const verifyToken = (
  req: express.Request,
  _res: express.Response,
  next: express.NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const authToken = authHeader && authHeader.split(" ")[1];
  if (!authToken)
    throw new createError.Forbidden();

  try {
    Jwt.verify(authToken, config.ACCESS_TOKEN_SECRET);
    next();
  } catch (error) {
    throw new createError.NotFound("Authorization token invalid");
  }
};
