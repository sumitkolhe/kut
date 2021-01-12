import { RequestHandler } from 'express'
import { LinkModel } from '@model/link.model'
import { CreateError } from '@middleware/errorHandler'

export const analytics: RequestHandler = async (req, res, next) => {
	try {
		await LinkModel.findOne({ shorturl: req.body.shorturl })
			.populate('analytics')
			.then((linkDetails: any) => {
				res.json(linkDetails)
			})
	} catch (err) {
		next(CreateError.NotFound())
	}
}
