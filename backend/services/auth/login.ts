import { RequestHandler } from "express";
import createError from "http-errors";
import bcrypt from "bcrypt";
import { UserModel } from "../../model/model";
import { userAuthSchema } from "../../utils/validation";
import { signToken } from "../../utils/signToken";

export const login: RequestHandler = async (req, res, next) => {
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

    const signedToken = signToken({ email: UserDetails.email });
    res.header("auth-token", signedToken).send(signedToken);
    
  } catch (error) {
    if (error.isJoi === true) error.status = 422;
    next(error);
  }
};
