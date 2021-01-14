import { RequestHandler } from 'express'
import { LinkModel } from '@model/link.model'
import { CreateError } from '@middleware/error-handler'

export const analytics: RequestHandler = async (req, res, next) => {
	try {
		await LinkModel.findOne({ short_url: req.body.short_url })
			.populate('analytics')
			.then((link_details: any) => {
				res.json(link_details)
			})
	} catch (err) {
		next(CreateError.NotFound())
	}
}
