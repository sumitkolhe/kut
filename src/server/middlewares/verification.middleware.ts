import { HttpExceptionError } from 'server/exceptions/http.exception'
import { ErrorType } from 'interfaces/error.interface'
import { UserModel } from 'server/models/user.model'
import type { RequestHandler } from 'express'

// verify if user account is verified
export const checkAccountVerification: RequestHandler = async (req, _res, next) => {
  const { email } = req.auth

  try {
    const user = await UserModel.findOne({ email })

    if (user && user.isVerified) next()
    else next(new HttpExceptionError(403, ErrorType.accountNotVerified))
  } catch (error) {
    if (error instanceof Error) throw new HttpExceptionError(401, error.message)
  }
}
