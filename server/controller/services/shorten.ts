import { config } from '@config/config'
import { RequestHandler } from 'express'
import { verifyLink } from '@utils/verify-link'
import { UserModel } from '@model/user.model'
import { LinkModel } from '@model/link.model'
import { generateUniqueAlias } from '@utils/generate-alias'
import { CreateError } from '@middleware/error-handler'

export const shorten: RequestHandler = async (req, res, next) => {
	try {
		let newAlias = req.body.alias
			? req.body.alias
			: await generateUniqueAlias()
		const newLink = new LinkModel({
			alias: newAlias,
			short_url: 'https://' + config.WEBSITE_DOMAIN + '/' + newAlias,
			long_url: verifyLink(req.body.long_url),
			description: req.body.description ? req.body.description : null,
			password: req.body.password ? req.body.password : null,
		})

		const savedLink = await newLink.save().catch(() => {
			throw CreateError.BadRequest('Alias Unavailable')
		})

		const userInstance: any = await UserModel.findOne({
			email: req.body.auth.email,
		})
		await userInstance.user_links.push(newLink)
		await userInstance.save()

		res.status(201).json(savedLink)
	} catch (err) {
		next(err)
	}
}
