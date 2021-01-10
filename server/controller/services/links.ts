import { UserModel } from '@model/user.model'
import { RequestHandler } from 'express'

export const links: RequestHandler = async (req, res, next) => {
	try {
		await UserModel.findOne({ email: req.body.auth.email })
			.populate({
				path: 'userLinks',
				options: {
					limit: req.query.limit || 3,
					sort: { created: -1 },
				},
			})
			.then((link: any) => {
				res.json(link?.userLinks)
			})
	} catch (error) {
		next(error)
	}
}
