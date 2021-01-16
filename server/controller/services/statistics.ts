import { RequestHandler } from 'express'
import { LinkModel } from '@model/link.model'
import { CreateError } from '@middleware/error-handler'
import { UserModel } from '@model/user.model'

export const statistics: RequestHandler = async (req, res, next) => {
	try {
		const total_active_links = await UserModel.aggregate([
			{ $match: { email: req.body.auth.email } },
			{
				$project: { user_links: { $size: '$user_links' } },
			},
		])

		const total_active_notes = await UserModel.aggregate([
			{ $match: { email: req.body.auth.email } },
			{
				$project: { user_notes: { $size: '$user_notes' } },
			},
		])
		const total_link_impressions = await LinkModel.aggregate([
			{ $match: { visit_count: { $gte: 0 } } },
			{
				$group: {
					_id: null,
					total: {
						$sum: '$visit_count',
					},
				},
			},
		]).catch(() => {
			throw CreateError.NoContent('No data available')
		})
		res.json({
			total_links: total_active_links[0].user_links,
			total_notes: total_active_notes[0].user_notes,
			total_link_impressions: total_link_impressions[0].total,
		})
	} catch (err) {
		next(err)
	}
}
