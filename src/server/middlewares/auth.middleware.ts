import { HttpExceptionError } from 'exceptions/http.exception'
import Jwt from 'jsonwebtoken'
import { getConfig } from 'configs'
import type { RequestHandler } from 'express'

const config = getConfig()

export const checkAuthentication: RequestHandler = (req, _res, next) => {
  const authHeader = req.headers['authorization']

  const accessToken = authHeader && authHeader.split(' ')[1]

  if (!accessToken) throw new HttpExceptionError(401, 'unauthorised')

  try {
    const tokenDetails = Jwt.verify(accessToken, config.accessToken.secret)

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
