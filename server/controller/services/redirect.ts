import { RequestHandler } from 'express'
import { LinkModel } from '@model/link.model'
import { AnalyticsModel } from '@model/analytics.model'
import { CreateError } from '@middleware/error-handler'

export const redirect: RequestHandler = async (req: any, res, next) => {
	try {
		const link_details: any = await LinkModel.findOne({
			alias: req.params.alias,
		})

		if (!link_details) throw CreateError.NotFound()
		//if (linkDetails.password) res.send('enter pass')
		else {
			
			const new_analytic = new AnalyticsModel(req.useragent)
			await new_analytic.save()
			await link_details.analytics.push(new_analytic)
			link_details.visit_count++
			await link_details.save()

			res.redirect(301, link_details.long_url.toString())
		}
	} catch (err) {
		next(err)
	}
}
