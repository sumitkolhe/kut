import { RequestHandler } from 'express'
import { CreateError } from '@middleware/error-handler'
import { UserModel } from '@model/user.model'

export const statistics: RequestHandler = async (req, res, next) => {
	try {
		const total_active_links = await UserModel.aggregate([
			{ $match: { email: req.auth_data.email } },
			{
				$project: { user_links: { $size: '$user_links' } },
			},
		])

		const total_active_notes = await UserModel.aggregate([
			{ $match: { email: req.auth_data.email } },
			{
				$project: { user_notes: { $size: '$user_notes' } },
			},
		])

		const account_created = await UserModel.findOne({
			email: req.auth_data.email,
		})
		if (total_active_links.length < 0 && total_active_notes.length < 0)
			throw CreateError.NotFound('No data available')
		res.json({
			total_links: total_active_links[0].user_links || 0,
			total_notes: total_active_notes[0].user_notes || 0,
			account_created: account_created.created_at,
		})
	} catch (err) {
		next(err)
	}
}
