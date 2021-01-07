import { config } from '@config/config'
import { RequestHandler } from 'express'
import { verifyLink } from '@utils/verifyLink'
import { UserModel } from '@model/user.model'
import { LinkModel } from '@model/link.model'
import { generateUniqueAlias } from '@utils/generateAlias'
import { CreateError } from '@middleware/errorHandler'

export const shorten: RequestHandler = async (req, res, next) => {
	let newAlias = req.body.alias ? req.body.alias : await generateUniqueAlias()
	const newLink = new LinkModel({
		alias: newAlias,
		shorturl: 'https://' + config.WEBSITE_DOMAIN + '/' + newAlias,
		longurl: verifyLink(req.body.longurl),
	})

	if (req.body.password) newLink.password = req.body.password

	try {
		const savedLink = await newLink.save()
		const userInstance: any = await UserModel.findOne({
			email: req.body.auth.email,
		})
		await userInstance.userLinks.push(newLink)
		await userInstance.save()
		res.json({
			longurl: savedLink.longurl,
			shorturl: savedLink.shorturl,
			created: savedLink.created,
		})
	} catch (err) {
		next(CreateError.BadRequest('Alias already exist'))
	}
}
