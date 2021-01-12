import express from 'express'
import Jwt from 'jsonwebtoken'
import { config } from '@config/config'
import { CreateError } from '@middleware/error-handler'

export const verifyToken = (
	req: express.Request,
	_res: express.Response,
	next: express.NextFunction
) => {
	const authHeader = req.headers['authorization']
	const access_token = authHeader && authHeader.split(' ')[1]
	if (!access_token)
		throw CreateError.Unauthorized('Authorization Token Not Supplied')

	try {
		const tokenDetails = Jwt.verify(
			access_token,
			config.ACCESS_TOKEN_SECRET
		)
		req.body.auth = tokenDetails
		next()
	} catch (error) {
		const errMessage =
			error.name === 'JsonWebTokenError'
				? 'Invalid Authentication Token'
				: error.message

		throw CreateError.Unauthorized(errMessage)
	}
}
