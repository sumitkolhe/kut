import { RequestHandler } from 'express'
import { LinkModel } from '@model/link.model'
import { AnalyticsModel } from '@model/analytics.model'
import { CreateError } from '@middleware/error-handler'

export const redirect: RequestHandler = async (req: any, res, next) => {
	try {
		const linkDetails: any = await LinkModel.findOne({
			alias: req.params.alias,
		})

		if (!linkDetails) throw CreateError.NotFound()
		//if (linkDetails.password) res.send('enter pass')
		else {
			const newAnalytic = new AnalyticsModel(req.useragent)
			await newAnalytic.save()
			await linkDetails.analytics.push(newAnalytic)
			linkDetails.visit_count++
			await linkDetails.save()

			res.redirect(301, linkDetails.long_url.toString())
		}
	} catch (err) {
		next(err)
	}
}
