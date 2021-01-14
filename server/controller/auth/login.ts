import { RequestHandler } from 'express'
import bcrypt from 'bcryptjs'
import { UserModel } from '@model/user.model'
import { userLoginSchema } from '@utils/validators'
import { signAccessToken, signRefreshToken } from '@helpers/sign-token'
import { CreateError } from '@middleware/error-handler'

export const login: RequestHandler = async (req, res, next) => {
	try {
		const validated_user_details = await userLoginSchema.validateAsync(
			req.body
		)

		const user_details = await UserModel.findOne({
			$or: [
				{ email: validated_user_details.email },
				{ user_name: validated_user_details.user_name },
			],
		})

		if (!user_details) throw CreateError.NotFound('User Does Not Exist')

		const check_password = await bcrypt.compare(
			req.body.password,
			user_details.password.toString()
		)

		if (!check_password)
			throw CreateError.BadRequest(
				'Incorrect username/email and password combination'
			)

		const signed_access_token = await signAccessToken({
			email: user_details.email,
		})
		const signed_refresh_token = await signRefreshToken({
			email: user_details.email,
		})

		res.json({
			access_token: signed_access_token,
			refresh_token: signed_refresh_token,
		})
	} catch (error) {
		if (error.isJoi === true) error.status = 422
		next(error)
	}
}
