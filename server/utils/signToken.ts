import Jwt from "jsonwebtoken";
import { config } from "@config/config";

export const signToken = (data: any) => {
  return Jwt.sign(data, config.ACCESS_TOKEN_SECRET, {
    expiresIn: config.ACCESS_TOKEN_EXPIRATION,
  });
};
