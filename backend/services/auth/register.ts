import express from "express";
import createError from "http-errors";
import userModel from "../../model/user";
import { userAuthSchema } from "../../utils/validation";

export const register = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const validatedUserDetails = await userAuthSchema.validateAsync(req.body);

    const ifUserExist = await userModel.findOne({
      email: validatedUserDetails.email,
    });

    if (ifUserExist) {
      throw new createError.Conflict("User already exists");
    }

    const newUser = new userModel(validatedUserDetails);
    const savedUser = await newUser.save();
    res.send(savedUser);
  } catch (error) {
    if (error.isJoi === true) error.status = 422;
    next(error);
  }
};
