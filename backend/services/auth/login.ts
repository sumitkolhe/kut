import express from "express";
import createError from "http-errors";
import bcrypt from "bcrypt";
import { UserModel } from "../../model/model";
import { userAuthSchema } from "../../utils/validation";
import { signToken } from "../../utils/token";

export const login = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const validatedUserDetails = await userAuthSchema.validateAsync(req.body);

    const UserDetails = await UserModel.findOne({
      email: validatedUserDetails.email,
    });

    if (!UserDetails) throw new createError.NotFound("User not found");

    const checkPassword = await bcrypt.compare(
      req.body.password,
      UserDetails.password.toString()
    );

    if (!checkPassword) throw new createError.NotFound("Wrong password");

    const signedToken = signToken({ _id: UserDetails._id });

    res.header("auth-token", signedToken).send(signedToken);
  } catch (error) {
    if (error.isJoi === true) error.status = 422;
    next(error);
  }
}; 
