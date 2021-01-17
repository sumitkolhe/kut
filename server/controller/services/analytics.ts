import { RequestHandler } from 'express'
import { LinkModel } from '@model/link.model'
import { Types } from 'mongoose'
import { CreateError } from '@middleware/error-handler'

export const analytics: RequestHandler = async (req, res, next) => {
	try {
		
		const analytics = await LinkModel.aggregate([
			{ $match: { _id: Types.ObjectId(req.body._id) } },

			{
				$lookup: {
					from: 'analytics',
					localField: 'analytics',
					foreignField: '_id',
					as: 'analytics',
				},
			},
			{ $unwind: '$analytics' },
			{
				$group: {
					_id: null,

					visit_count: { $first: '$visit_count' },
					password_protected: { $first: '$password_protected' },
					description: { $first: '$description' },
					alias: { $first: '$alias' },
					short_url: { $first: '$short_url' },
					long_url: { $first: '$long_url' },
					created: { $first: '$created' },

					windows: {
						$sum: { $cond: ['$analytics.os.windows', 1, 0] },
					},
					linux: {
						$sum: { $cond: ['$analytics.os.linux', 1, 0] },
					},
					mac: {
						$sum: { $cond: ['$analytics.os.mac', 1, 0] },
					},
					android: {
						$sum: { $cond: ['$analytics.os.android', 1, 0] },
					},
					opera: {
						$sum: { $cond: ['$analytics.browser.opera', 1, 0] },
					},
					ie: {
						$sum: { $cond: ['$analytics.browser.ie', 1, 0] },
					},
					edge: {
						$sum: { $cond: ['$analytics.browser.edge', 1, 0] },
					},
					safari: {
						$sum: {
							$cond: ['$analytics.browser.safari', 1, 0],
						},
					},
					firefox: {
						$sum: {
							$cond: ['$analytics.browser.firefox', 1, 0],
						},
					},
					chrome: {
						$sum: {
							$cond: ['$analytics.browser.chrome', 1, 0],
						},
					},
				},
			},
			{
				$addFields: {
					analytics: {
						os: {
							windows: '$windows',
							linux: '$linux',
							mac: '$mac',
							android: '$android',
						},
						browser: {
							opera: '$opera',
							ie: '$ie',
							edge: '$edge',
							safari: '$safari',
							firefox: '$firefox',
							chrome: '$chrome',
						},
					},
					windows: '$$REMOVE',
					linux: '$$REMOVE',
					mac: '$$REMOVE',
					android: '$$REMOVE',
					opera: '$$REMOVE',
					ie: '$$REMOVE',
					edge: '$$REMOVE',
					safari: '$$REMOVE',
					firefox: '$$REMOVE',
					chrome: '$$REMOVE',
				},
			},
		])

		if (analytics.length <= 0)
			throw CreateError.NotFound('No data available')

		res.json(analytics[0])
	} catch (err) {
		next(err)
	}
}
