import Jwt from 'jsonwebtoken'
import { ErrorType } from 'interfaces/error.interface'
import { HttpExceptionError } from 'server/common/exceptions/http.exception'
import { useConfig } from 'server/common/configs'
import type { RequestHandler } from 'express'
import { userRepository } from '~/server/modules/users/repositories/user.repository'

const config = useConfig()

export const checkAuthentication: RequestHandler = async (req, _res, next) => {
  const authHeader = req.headers['authorization']
  const accessToken = authHeader && authHeader.split(' ')[1]

  // if no access token provided
  if (!accessToken) return next(new HttpExceptionError(401, ErrorType.unauthorised))

  try {
    const tokenDetails = Jwt.verify(accessToken, config.token.access.secret) as Jwt.JwtPayload

    const user = await userRepository.getById(tokenDetails.id)

    if (!user) {
      return next(new HttpExceptionError(401, ErrorType.userNotFound))
    }

    req.auth = {
      // @ts-expect-error
      userId: user._id,
      email: user.email,
      isVerified: user.isVerified!,
      isBanned: user.isBanned!,
    }

    return next()
  } catch (error) {
    let errorMessage = error

    if (error instanceof Error) {
      if (error.name === 'TokenExpiredError' || error.name === 'JsonWebTokenError')
        errorMessage = ErrorType.invalidAuthenticationToken
      else errorMessage = error.message
    }
    next(new HttpExceptionError(401, errorMessage as string))
  }
}
