import { RequestHandler } from 'express'
import { LinkModel } from '@model/link.model'
import { CreateError } from '@middleware/error-handler'
import { NotesModel } from '@model/notes.model'

export const statistics: RequestHandler = async (_req, res, next) => {
	try {
		const total_active_links = await LinkModel.countDocuments({})
		const total_active_notes = await NotesModel.countDocuments({})
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
		]).catch((err) => {
			throw CreateError.InternalServerError(err)
		})
		res.json({
			total_links: total_active_links,
			total_notes: total_active_notes,
			total_link_impressions: total_link_impressions[0].total,
		})
	} catch (err) {
		next(CreateError.NotFound())
	}
}
