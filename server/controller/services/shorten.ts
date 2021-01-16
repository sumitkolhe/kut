import { RequestHandler } from 'express'
import { UserModel } from '@model/user.model'
import { LinkModel } from '@model/link.model'
import { CreateError } from '@middleware/error-handler'
import { generateLinkPayload } from '@helpers/generate-link-payload'

export const shorten: RequestHandler = async (req, res, next) => {
	try {
		const new_link = new LinkModel(await generateLinkPayload(req))

		const saved_link = await new_link.save().catch(() => {
			throw CreateError.BadRequest('Alias already in use')
		})

		const user_instance: any = await UserModel.findOne({
			email: req.body.auth.email,
		})
		await user_instance.user_links.push(new_link)
		await user_instance.save()
		res.status(201).json({
			alias: saved_link.alias,
			short_url: saved_link.short_url,
			long_url: saved_link.long_url,
			created: saved_link.created,
		})
	} catch (err) {
		next(err)
	}
}
