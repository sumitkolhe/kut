import { RequestHandler } from 'express'
import { UserModel } from '@model/user.model'
import { LinkModel } from '@model/link.model'
import { CreateError } from '@middleware/error-handler'
import { generateLinkPayload } from '@helpers/generate-link-payload'

export const shorten: RequestHandler = async (req, res, next) => {
	try {
		const newLink = new LinkModel(await generateLinkPayload(req))

		const savedLink = await newLink.save().catch((err: any) => {
			throw CreateError.BadRequest(`${err}Alias already in use`)
		})

		const userInstance: any = await UserModel.findOne({
			email: req.body.auth.email,
		})
		await userInstance.user_links.push(newLink)
		await userInstance.save()
		res.status(201).json({
			password_protected: savedLink.password_protected,
			description: savedLink.description,
			alias: savedLink.alias,
			short_url: savedLink.short_url,
			long_url: savedLink.long_url,
			created: savedLink.created,
		})
	} catch (err) {
		next(err)
	}
}
