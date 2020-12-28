import { RequestHandler } from 'express'

import bcrypt from 'bcrypt'
import { UserModel } from '@model/user.model'
import { userLoginSchema } from '@utils/validators'
import { signToken } from '@utils/signToken'
import { CreateError } from '@middleware/errorHandler'

export const login: RequestHandler = async (req, res, next) => {
  try {
    const validatedUserDetails = await userLoginSchema.validateAsync(req.body)

    const UserDetails = await UserModel.findOne({
      $or: [
        { email: validatedUserDetails.email },
        { userName: validatedUserDetails.userName },
      ],
    })

    if (!UserDetails) throw CreateError.NotFound('User Does Not Exist')

    const checkPassword = await bcrypt.compare(
      req.body.password,
      UserDetails.password.toString()
    )

    if (!checkPassword) throw CreateError.NotFound('Wrong Password')

    const signedToken = signToken({ email: UserDetails.email })

    res.json({
      authToken: signedToken,
    })
  } catch (error) {
    if (error.isJoi === true) error.status = 422
    next(error)
  }
}
