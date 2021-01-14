import { RequestHandler } from 'express'
import bcrypt from 'bcryptjs'
import { UserModel } from '@model/user.model'
import { userLoginSchema } from '@utils/validators'
import { signAccessToken, signRefreshToken } from '@helpers/sign-token'
import { CreateError } from '@middleware/error-handler'

export const login: RequestHandler = async (req, res, next) => {
	try {
		const validatedUserDetails = await userLoginSchema.validateAsync(
			req.body
		)

		const UserDetails = await UserModel.findOne({
			$or: [
				{ email: validatedUserDetails.email },
				{ user_name: validatedUserDetails.user_name },
			],
		})

		if (!UserDetails) throw CreateError.NotFound('User Does Not Exist')

		const checkPassword = await bcrypt.compare(
			req.body.password,
			UserDetails.password.toString()
		)

		if (!checkPassword)
			throw CreateError.BadRequest(
				'Incorrect username/email and password combination'
			)

		const signedAccessToken = await signAccessToken({
			email: UserDetails.email,
		})
		const signedRefreshToken = await signRefreshToken({
			email: UserDetails.email,
		})

		res.json({
			access_token: signedAccessToken,
			refresh_token: signedRefreshToken,
		})
	} catch (error) {
		if (error.isJoi === true) error.status = 422
		next(error)
	}
}
