import { ErrorType } from 'interfaces/error.interface'
import type { RequestHandler } from 'express'
import { HttpExceptionError } from '~/server/common/exceptions/http.exception'

export const checkEmailVerification: RequestHandler = async (req, _res, next) => {
  try {
    const { isVerified, isBanned } = req.auth

    if (!isVerified) {
      return next(new HttpExceptionError(403, ErrorType.accountNotVerified))
    } else if (isBanned) {
      return next(new HttpExceptionError(403, ErrorType.userBanned))
    }

    return next()
  } catch (error) {
    next(new HttpExceptionError(403, error as string))
  }
}
