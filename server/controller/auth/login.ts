import { RequestHandler } from 'express'
import bcrypt from 'bcryptjs'
import { UserModel } from '@model/user.model'
import { userLoginSchema } from '@utils/validators'
import { signAccessToken, signRefreshToken } from '@utils/signToken'
import { CreateError } from '@middleware/errorHandler'

export const login: RequestHandler = async (req, res, next) => {
	try {
		const validatedUserDetails = await userLoginSchema.validateAsync(
			req.body
		)

		const UserDetails = await UserModel.findOne({
			$or: [
				{ email: validatedUserDetails.email },
				{ userName: validatedUserDetails.userName },
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
			accessToken: signedAccessToken,
			refreshToken: signedRefreshToken,
		})
	} catch (error) {
		if (error.isJoi === true) error.status = 422
		next(error)
	}
}
