import Jwt from 'jsonwebtoken'
import { config } from '@config/config'
import { CreateError } from '@middleware/error-handler'

export const signAccessToken = async (data: any) => {
	try {
		return Jwt.sign(data, config.ACCESS_TOKEN_SECRET, {
			expiresIn: config.ACCESS_TOKEN_EXPIRATION,
		})
	} catch (error) {
		throw CreateError.InternalServerError()
	}
}

export const signRefreshToken = async (data: any) => {
	try {
		return Jwt.sign(data, config.REFRESH_TOKEN_SECRET, {
			expiresIn: config.REFRESH_TOKEN_EXPIRATION,
		})
	} catch (error) {
		throw CreateError.InternalServerError()
	}
}
