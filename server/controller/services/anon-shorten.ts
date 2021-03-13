import { RequestHandler } from 'express'
import { LinkModel } from '@model/link.model'
import { CreateError } from '@middleware/error-handler'
import { generateLinkPayload } from '@helpers/generate-link-payload'

export const anonShorten: RequestHandler = async (req, res, next) => {
	try {
		const new_link = new LinkModel(await generateLinkPayload(req))
		console.log(new_link)

		const saved_link = await new_link.save().catch(() => {
			throw CreateError.BadRequest('Alias is already in use')
		})

		res.status(201).json({
			alias: saved_link.alias,
			short_url: saved_link.short_url,
			long_url: saved_link.long_url,
			created_at: saved_link.created_at,
		})
	} catch (err) {
		next(err)
	}
}
