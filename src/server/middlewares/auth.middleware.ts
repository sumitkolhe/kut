import { HttpExceptionError } from 'exceptions/http.exception'
import Jwt from 'jsonwebtoken'
import { useConfig } from 'configs'
import { ErrorType } from 'interfaces/error.interface'
import type { RequestHandler } from 'express'
import { getCookies } from '~~/src/server/utils/cookie'

const config = useConfig()

// verify access token
export const checkAuthentication: RequestHandler = (req, _res, next) => {
  const accessToken = getCookies(req.headers.cookie)?.accessToken

  if (!accessToken) throw new HttpExceptionError(401, ErrorType.unauthorised)

  try {
    const tokenDetails = Jwt.verify(accessToken, config.token.access.secret)

    req.auth = tokenDetails

    next()
  } catch (error) {
    let errorMessage = error

    if (error instanceof Error) {
      errorMessage = error.name === 'JsonWebTokenError' ? 'invalid authentication token' : error.message
    }
    throw new HttpExceptionError(401, errorMessage as string)
  }
}
