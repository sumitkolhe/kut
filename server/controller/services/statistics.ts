import { RequestHandler } from 'express'
import { CreateError } from '@middleware/error-handler'
import { UserModel } from '@model/user.model'

export const statistics: RequestHandler = async (req, res, next) => {
	try {
		// const total_active_links = await UserModel.aggregate([
		// 	{ $match: { email: req.auth_data.email } },
		// 	{
		// 		$project: { user_links: { $size: '$user_links' } },
		// 	},
		// ])

		const data = await UserModel.aggregate([
			{ $match: { email: req.auth_data.email } },
			{
				$project: {
					_id: false,
					user_notes: { $size: '$user_notes' },
					user_links: { $size: '$user_links' },
					account_created: '$created_at',
				},
			},
		])

		if (data.length < 0) throw CreateError.NotFound('No data available')
		res.json(data[0])
	} catch (err) {
		next(err)
	}
}
