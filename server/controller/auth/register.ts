import { RequestHandler } from 'express'
import bcrypt from 'bcryptjs'
import { UserModel } from '@model/user.model'
import { userRegisterSchema } from '@utils/validators'
import { CreateError } from '@middleware/error-handler'
import { config } from '@config/config'

export const register: RequestHandler = async (req, res, next) => {
	try {
		if (config.ALLOW_REGISTERATION != true)
			throw new CreateError(403, 'Registeration is disabled!')

		const validated_user_details = await userRegisterSchema.validateAsync(
			req.body
		)

		const ifUserExist = await UserModel.findOne({
			$or: [
				{ email: validated_user_details.email },
				{ user_name: validated_user_details.user_name },
			],
		})

		if (ifUserExist)
			throw new CreateError(409, 'Username or email already registered')

		const salt = await bcrypt.genSalt(10)
		const hashed_password = await bcrypt.hash(
			validated_user_details.password,
			salt
		)

		validated_user_details.password = hashed_password

		const new_user = new UserModel(validated_user_details)
		await new_user.save().catch(() => {
			throw CreateError.InternalServerError('Some error occurred')
		})

		res.json({ message: 'User registered successfully' })
	} catch (error) {
		if (error.isJoi === true) error.status = 422
		next(error)
	}
}
