import { RequestHandler } from 'express'
import bcrypt from 'bcryptjs'
import { UserModel } from '@model/user.model'
import { userRegisterSchema } from '@utils/validators'
import { CreateError } from '@middleware/error-handler'

export const register: RequestHandler = async (req, res, next) => {
	try {
		const validatedUserDetails = await userRegisterSchema.validateAsync(
			req.body
		)

		const ifUserExist = await UserModel.findOne({
			$or: [
				{ email: validatedUserDetails.email },
				{ user_name: validatedUserDetails.user_name },
			],
		})

		if (ifUserExist)
			throw new CreateError(409, 'Username or email already registered')

		const salt = await bcrypt.genSalt(10)
		const hashedPassword = await bcrypt.hash(
			validatedUserDetails.password,
			salt
		)

		validatedUserDetails.password = hashedPassword

		const newUser = new UserModel(validatedUserDetails)
		await newUser.save().catch(() => {
			throw CreateError.InternalServerError('Some error occurred')
		})

		res.json({ message: 'User registered successfully' })
	} catch (error) {
		if (error.isJoi === true) error.status = 422
		next(error)
	}
}
