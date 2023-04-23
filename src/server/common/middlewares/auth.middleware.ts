import Jwt from 'jsonwebtoken'
import { ErrorType } from 'interfaces/error.interface'
import { HttpExceptionError } from 'server/common/exceptions/http.exception'
import { useConfig } from 'server/common/configs'
import type { RequestHandler } from 'express'
import { userRepository } from '~/server/modules/users/repositories/user.repository'

const config = useConfig()

export const checkAuthentication: RequestHandler = async (req, _res, next) => {
  // const accessToken = getCookies(req.headers.cookie)?.accessToken
  const authHeader = req.headers['authorization']
  const accessToken = authHeader && authHeader.split(' ')[1]

  // if no access token provided
  if (!accessToken) return next(new HttpExceptionError(401, ErrorType.unauthorised))

  try {
    const tokenDetails = Jwt.verify(accessToken, config.token.access.secret) as Jwt.JwtPayload

    const user = await userRepository.findByEmail(tokenDetails.email)
    console.log('user', user)
    if (!user) {
      return next(new HttpExceptionError(401, ErrorType.userNotFound))
    }

    req.auth = {
      userId: user.id,
      email: user.email,
      isVerified: user.isVerified,
      isBanned: user.isBanned,
    }

    return next()
  } catch (error) {
    let errorMessage = error

    if (error instanceof Error) {
      errorMessage =
        error.name === 'JsonWebTokenError' ? ErrorType.invalidAuthenticationToken : error.message
    }
    next(new HttpExceptionError(401, errorMessage as string))
  }
}
