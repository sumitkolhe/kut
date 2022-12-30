import { HttpExceptionError } from 'server/exceptions/http.exception'
import Jwt from 'jsonwebtoken'
import { useConfig } from 'server/configs'
import { ErrorType } from 'interfaces/error.interface'
import { getCookies } from 'server/utils/cookie'
import type { RequestHandler } from 'express'

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
      errorMessage =
        error.name === 'JsonWebTokenError' ? ErrorType.invalidAuthenticationToken : error.message
    }
    throw new HttpExceptionError(401, errorMessage as string)
  }
}
