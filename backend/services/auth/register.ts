import express from "express";
import user from "../../model/user";
import { userAuthSchema } from "../../utils/validation";

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;
    const result = await userAuthSchema.validateAsync(req.body);
    
    console.log(result)

    const userExist = await user.findOne({ email: email });

    if (userExist) res.status(400).send("User exist");

    const newUser = new user({ email, password });
    const savedUser = await newUser.save();
    res.send(savedUser);
  } catch (error) {
    //console.log(error);
  }
};
