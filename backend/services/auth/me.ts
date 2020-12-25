import { RequestHandler } from "express";
import createError from "http-errors";
import { UserModel } from "@model/user.model";

export const me: RequestHandler = async (req, res, next) => {
  try {
    const UserDetails = await UserModel.findOne({
      email: req.body.auth.email,
    });

    if (!UserDetails) throw new createError.NotFound("User not found");

    res.json({
      userDetails: {
        userName: UserDetails.userName,
        email: UserDetails.email,
        created: UserDetails.created,
      },
    });
  } catch (error) {
    next(error);
  }
};
