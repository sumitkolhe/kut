import { RequestHandler } from 'express'
import { LinkModel } from '@model/link.model'
import { CreateError } from '@middleware/error-handler'
import { NotesModel } from '@model/notes.model'

export const statistics: RequestHandler = async (_req, res, next) => {
	try {
		const totalActiveLinks = await LinkModel.countDocuments({})
		const totalActiveNotes = await NotesModel.countDocuments({})
		const totalLinkImpressions = await LinkModel.aggregate([
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
			total_links: totalActiveLinks,
			total_notes: totalActiveNotes,
			total_link_impressions: totalLinkImpressions[0].total,
		})
	} catch (err) {
		next(CreateError.NotFound())
	}
}
