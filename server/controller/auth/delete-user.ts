import { RequestHandler } from 'express'
import { UserModel } from '@model/user.model'

export const deleteUser: RequestHandler = async (req, res, next) => {
	try {
		await UserModel.findOneAndDelete({
			email: req.auth_data.email,
		})

		res.json({
			message: 'User deleted',
		})
	} catch (error) {
		next(error)
	}
}
