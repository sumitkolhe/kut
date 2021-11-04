import express, { RequestHandler } from 'express'
import { verify } from 'jsonwebtoken'
import { globalConfig } from 'src/config/global'
import { CreateError } from 'src/middleware/errorHandler'
import { CurrentUser } from 'src/interfaces/user'

export const checkAuthentication: RequestHandler = (
  req: express.Request,
  _res: express.Response,
  next: express.NextFunction
) => {
  try {
    const authCookies = req.headers.cookie
    const accessToken = authCookies.split('=')[1]

    if (!accessToken) throw CreateError.Unauthorized()

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
