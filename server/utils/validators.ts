import Joi from 'joi'

export const userRegisterSchema = Joi.object({
	user_name: Joi.string().lowercase().required(),
	email: Joi.string().email().lowercase().required(),
	password: Joi.string().min(6).required(),
})

export const userLoginSchema = Joi.object({
	user_name: Joi.string().lowercase(),
	email: Joi.string().email().lowercase(),
	password: Joi.string().min(6).required(),
}).or('user_name', 'email')
