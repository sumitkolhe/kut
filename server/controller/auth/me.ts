import { RequestHandler } from 'express'
import { CreateError } from '@middleware/error-handler'
import { UserModel } from '@model/user.model'

export const me: RequestHandler = async (req, res, next) => {
	try {
		const UserDetails = await UserModel.findOne({
			email: req.body.auth.email,
		})

		if (!UserDetails) throw CreateError.NotFound('User not found')

		res.json({
			user_details: {
				user_name: UserDetails.user_name,
				email: UserDetails.email,
				created: UserDetails.created,
			},
		})
	} catch (error) {
		next(error)
	}
}
