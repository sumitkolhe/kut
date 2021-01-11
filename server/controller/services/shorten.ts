import { config } from '@config/config'
import { RequestHandler } from 'express'
import { verifyLink } from '@utils/verifyLink'
import { UserModel } from '@model/user.model'
import { LinkModel } from '@model/link.model'
import { generateUniqueAlias } from '@utils/generateAlias'
import { CreateError } from '@middleware/errorHandler'

export const shorten: RequestHandler = async (req, res, next) => {
	try {
		let newAlias = req.body.alias
			? req.body.alias
			: await generateUniqueAlias()
		const newLink = new LinkModel({
			alias: newAlias,
			shorturl: 'https://' + config.WEBSITE_DOMAIN + '/' + newAlias,
			longurl: verifyLink(req.body.longurl),
			description: req.body.description ? req.body.description : null,
			password: req.body.password ? req.body.password : null,
		})

		const savedLink = await newLink.save().catch(() => {
			throw CreateError.BadRequest('Alias Unavailable')
		})

		const userInstance: any = await UserModel.findOne({
			email: req.body.auth.email,
		})
		await userInstance.userLinks.push(newLink)
		await userInstance.save()

		res.status(201).json(savedLink)
	} catch (err) {
		next(err)
	}
}
