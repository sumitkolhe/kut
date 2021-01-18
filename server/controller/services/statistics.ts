import { RequestHandler } from 'express'
//import { LinkModel } from '@model/link.model'
//import { CreateError } from '@middleware/error-handler'
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
		const total_link_impressions = await UserModel.aggregate([
			{
				$match: {
					$and: [{ email: req.body.auth.email }],
				},
			},
			{
				$lookup: {
					from: 'user_links',
					localField: 'user_links',
					foreignField: '_id',
					as: 'user_links',
				},
			},
			{ $unwind: '$user_links' },
			{
				$group: {
					_id: null,

					$sum: '$visit_count ',
				},
			},
		])
		//if (total_active_links.length<0 && total_active_notes.length<0)
		//	throw CreateError.NotFound('No data available')
		res.json({
			total_links: total_active_links[0].user_links || 0,
			total_notes: total_active_notes[0].user_notes || 0,
			total_link_impressions: total_link_impressions[0].total || 0,
		})
	} catch (err) {
		next(err)
	}
}
