import { HttpExceptionError } from 'server/exceptions/http.exception'
import { ErrorType } from 'interfaces/error.interface'
import type { RequestHandler } from 'express'

export const checkEmailVerification: RequestHandler = async (req, _res, next) => {
  try {
    const { isVerified, isBanned } = req.auth

    if (!isVerified) {
      return next(new HttpExceptionError(401, ErrorType.accountNotVerified))
    } else if (isBanned) {
      return next(new HttpExceptionError(403, ErrorType.userBanned))
    }

    return next()
  } catch (error) {
    next(new HttpExceptionError(401, error as string))
  }
}
