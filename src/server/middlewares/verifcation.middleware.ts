import { HttpExceptionError } from 'server/exceptions/http.exception'
import { ErrorType } from 'interfaces/error.interface'
import type { RequestHandler } from 'express'

export const checkEmailVerification: RequestHandler = async (req, _res, next) => {
    const { isVerified, isBanned } = req.auth

    if (!isVerified) {
      return next(new HttpExceptionError(401, ErrorType.accountNotVerified))
    } else if (isBanned) {
      return next(new HttpExceptionError(403, ErrorType.userBanned))
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
