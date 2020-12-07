import { RequestHandler } from "express";
import Jwt from "jsonwebtoken";
import createError from "http-errors";
import { config } from "../../config";

export const verifyToken: RequestHandler = async (req, _res, next) => {
  const authHeader = req.headers["authorization"];
  const authToken = authHeader && authHeader.split(" ")[1];
  if (!authToken) throw new createError.Forbidden();

  try {
    const verifiedToken: any = Jwt.verify(
      authToken,
      config.ACCESS_TOKEN_SECRET
    );
    const email = verifiedToken.email as { email: string };
    req.body.email = email;
    next();
  } catch (error) {
    throw new createError.NotFound("Invalid token");
  }
};
