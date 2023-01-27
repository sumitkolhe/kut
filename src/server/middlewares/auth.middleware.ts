import { HttpExceptionError } from 'server/exceptions/http.exception'
import Jwt from 'jsonwebtoken'
import { useConfig } from 'server/configs'
import { ErrorType } from 'interfaces/error.interface'
import { getCookies } from 'server/utils/cookie'
import { UserModel } from 'server/models/user.model'
import type { RequestHandler } from 'express'

const config = useConfig()

export const checkAuthentication: RequestHandler = async (req, _res, next) => {
  const accessToken = getCookies(req.headers.cookie)?.accessToken

  // if no access token provided
  if (!accessToken) throw new HttpExceptionError(401, ErrorType.unauthorised)

  try {
    const tokenDetails = Jwt.verify(accessToken, config.token.access.secret) as Jwt.JwtPayload

    const user = await UserModel.findOne({ email: tokenDetails.email })

    if (!user) {
      next(new HttpExceptionError(401, ErrorType.userNotFound))
    } else if (user && !user.isVerified) {
      next(new HttpExceptionError(403, ErrorType.accountNotVerified))
    } else if (user && user.isVerified) {
      req.auth = {
        id: user.id,
        email: user.email,
      }

      next()
    }
  } catch (error) {
    let errorMessage = error

    if (error instanceof Error) {
      errorMessage =
        error.name === 'JsonWebTokenError' ? ErrorType.invalidAuthenticationToken : error.message
    }
    next(new HttpExceptionError(401, errorMessage as string))
  }
}
