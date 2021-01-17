import { RequestHandler } from 'express'
import { CreateError } from '@middleware/error-handler'
import { UserModel } from '@model/user.model'

export const me: RequestHandler = async (req, res, next) => {
	try {
		const user_details = await UserModel.findOne({
			email: req.body.auth.email,
		})

		if (!user_details) throw CreateError.NotFound('User not found')

		res.json({
			user_details: {
				user_name: user_details.user_name,
				email: user_details.email,
				created_at: user_details.created_at,
			},
		})
	} catch (error) {
		next(error)
	}
}
