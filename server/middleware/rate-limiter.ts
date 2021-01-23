import { RateLimiterMongo } from 'rate-limiter-flexible'
import { RequestHandler } from 'express'
import mongoose from 'mongoose'
import { CreateError } from '@middleware/error-handler'
import { config } from '@config/config'
import { mongoOptions } from '@helpers/init-database'

const mongoConnection = mongoose.createConnection(
	config.MONGO_URL,
	mongoOptions
)

mongoConnection.on('connected', () => {
	console.log('limiter connected')
})
const opts = {
	mongo: mongoConnection,
	storeClient: mongoConnection,
	keyPrefix: 'limits',
	points: 5, // total points available
	duration: 90, //in seconds
}

const rateLimiterMongo = new RateLimiterMongo(opts)

export const rateLimit: RequestHandler = async (req, _res, next) => {
	try {
		await rateLimiterMongo
			.consume(req.ip, 1) //consumes 1 point
			.then(() => {
				next()
			})
			.catch(() => {
				throw CreateError.TooManyRequests('Woah! Slow down')
			})
	} catch (error) {
		next(error)
	}
}
