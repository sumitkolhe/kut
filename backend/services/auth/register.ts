import { RequestHandler } from "express";
import createError from "http-errors";
import bcrypt from "bcrypt";
import { UserModel } from "../../model/model";
import { userAuthSchema } from "../../utils/validation";

export const register: RequestHandler = async (req, res, next) => {
  try {
    const validatedUserDetails = await userAuthSchema.validateAsync(req.body);

    const ifUserExist = await UserModel.findOne({
      email: validatedUserDetails.email,
    });

    if (ifUserExist) throw new createError.Conflict("User already exists");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(
      validatedUserDetails.password,
      salt
    );

    validatedUserDetails.password = hashedPassword;

    const newUser = new UserModel(validatedUserDetails);
    const savedUser = await newUser.save();

    res.send(savedUser);
  } catch (error) {
    if (error.isJoi === true) error.status = 422;
    next(error);
  }
};
