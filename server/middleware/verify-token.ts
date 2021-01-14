import express from 'express'
import Jwt from 'jsonwebtoken'
import { config } from '@config/config'
import { CreateError } from '@middleware/error-handler'

export const verifyToken = (
	req: express.Request,
	_res: express.Response,
	next: express.NextFunction
) => {
	const auth_header = req.headers['authorization']
	const access_token = auth_header && auth_header.split(' ')[1]
	if (!access_token)
		throw CreateError.Unauthorized('Authorization token not supplied')

	try {
		const token_details = Jwt.verify(
			access_token,
			config.ACCESS_TOKEN_SECRET
		)
		req.body.auth = token_details
		next()
	} catch (error) {
		const err_message =
			error.name === 'JsonWebTokenError'
				? 'Invalid Authentication Token'
				: error.message

		throw CreateError.Unauthorized(err_message)
	}
}
