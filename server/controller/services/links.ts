import { UserModel } from '@model/user.model'
import { RequestHandler } from 'express'

export const links: RequestHandler = async (req, res, next) => {
	try {
		await UserModel.findOne({ email: req.body.auth.email })
			.populate({
				path: 'user_links',
				options: {
					limit: req.query.limit
						? req.query.limit != (undefined || null) &&
						  req.query.limit
						: false,
					sort: { created: -1 },
				},
			})
			.then((link: any) => {
				res.json(link?.user_links)
			})
	} catch (error) {
		next(error)
	}
}
