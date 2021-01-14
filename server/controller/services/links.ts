import { CreateError } from '@middleware/error-handler'
import { LinkModel } from '@model/link.model'
import { UserModel } from '@model/user.model'
import { generateUpdateLinkPayload } from '@helpers/generate-link-payload'
import { RequestHandler } from 'express'

export const getLinks: RequestHandler = async (req, res, next) => {
	try {
		await UserModel.findOne({ email: req.body.auth.email })
			.populate({
				path: 'user_links',
				options: {
					limit: req.query.limit
						? req.query.limit != (undefined || null) &&
						  req.query.limit
						: false,
					sort: { created: -1 },
				},
			})
			.then((link: any) => {
				res.json(link?.user_links)
			})
	} catch (error) {
		next(error)
	}
}

export const updateLink: RequestHandler = async (req, res, next) => {
	try {
		const payload = await generateUpdateLinkPayload(req)
		console.log(payload)
		await LinkModel.findByIdAndUpdate(payload._id, payload as any).catch(
			() => {
				throw CreateError.BadRequest('Alias is already in use')
			}
		)
		res.json({
			message: 'Link updated successfully',
		})
	} catch (error) {
		next(error)
	}
}

export const deleteLink: RequestHandler = async (req, res, next) => {
	try {
		await LinkModel.findByIdAndDelete(req.body._id).then(() => {
			res.json({ message: 'Link deleted successfully' })
		})
	} catch (error) {
		next(error)
	}
}
