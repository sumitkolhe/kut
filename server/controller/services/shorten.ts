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
			password:
				req.body.password && req.body.password != (null || '')
					? req.body.password
					: null,
			password_protected:
				req.body.password && req.body.password != (null || '')
					? true
					: false,
		})

		const savedLink = await newLink.save().catch(() => {
			throw CreateError.BadRequest('Alias Already In Use')
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
