import Joi from "joi";

export const userAuthSchema = Joi.object({
  userName: Joi.string().lowercase(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(6).required(),
});
