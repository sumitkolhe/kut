import Joi from "joi";

export const userRegisterSchema = Joi.object({
  userName: Joi.string().lowercase().required(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(6).required(),
});

export const userLoginSchema = Joi.object({
  userName: Joi.string().lowercase(),
  email: Joi.string().email().lowercase(),
  password: Joi.string().min(6).required(),
}).or("userName", "email");
