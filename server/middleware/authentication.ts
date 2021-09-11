import express, { RequestHandler } from 'express'
import { verify } from 'jsonwebtoken'
import { globalConfig } from '@server/config/global'
import { CreateError } from '@server/middleware/errorHandler'
import { CurrentUser } from '@server/interfaces/user'

export const checkAuthentication: RequestHandler = (
  req: express.Request,
  _res: express.Response,
  next: express.NextFunction
) => {
  try {
    const authHeader = req.headers.authorization
    const accessToken = authHeader && authHeader.split(' ')[1]
    if (!accessToken) throw CreateError.Unauthorized('Authorization token not found')

    const tokenDetails = verify(accessToken, globalConfig.accessTokenSecret) as CurrentUser
    req.currentUser = tokenDetails
    next()
  } catch (error) {
    const errMessage = error.name === 'JsonWebTokenError' ? 'Invalid authentication token' : error.message
    throw CreateError.Unauthorized(errMessage)
  }
}

// export const verifyRefreshToken = (refresh_token: string) => {
// 	try {
// 		const token_details = Jwt.verify(
// 			refresh_token,
// 			config.refreshTokenSecret
// 		)

// 		return true
// 	} catch (error) {
// 		const err_message =
// 			error.name === 'JsonWebTokenError'
// 				? 'Invalid Authentication Token'
// 				: error.message

// 		throw CreateError.Unauthorized(err_message)
// 	}
// }
