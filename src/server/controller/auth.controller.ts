import { RequestHandler } from 'express'
import { userInfo } from '@server/services/auth/user'
import { userRegisterSchema } from '@server/helpers/validators'
import { userDetailsInterface } from '@server/interfaces/user'
import { checkPassword, generateLoginToken } from '@server/services/auth/login'
import { globalConfig } from '@server/config/global'
import { checkIfUserExists } from '@server/helpers/checkUser'
import { CreateError } from '@server/middleware/errorHandler'
import { addUserToDatabase } from '@server/services/auth/register'

export const registerUser: RequestHandler = async (req, res, next) => {
  try {
    if (!globalConfig.ALLOW_REGISTRATION) throw new CreateError(403, 'Registration is disabled!')

    const validatedUserDetails: userDetailsInterface = await userRegisterSchema.validateAsync(req.body)

    const userAlreadyExist = await checkIfUserExists(validatedUserDetails.email)

    if (userAlreadyExist) throw CreateError.Conflict('Username or email already registered')

    await addUserToDatabase(validatedUserDetails.email, validatedUserDetails.password)

    res.json({ message: 'User registered successfully' })
  } catch (error) {
    if (error.isJoi === true) error.status = 422
    next(error)
  }
}

export const loginUser: RequestHandler = async (req, res, next) => {
  try {
    const validatedUserDetails: userDetailsInterface = await userRegisterSchema.validateAsync(req.body)

    const userAlreadyExist = await checkIfUserExists(validatedUserDetails.email)

    if (!userAlreadyExist) throw CreateError.Conflict('User does not exists')
    if (userAlreadyExist.isBanned) throw CreateError.Unauthorized('User is banned')
    if (!userAlreadyExist.isVerified) throw CreateError.Unauthorized('Email not verified')

    const passwordMatch = await checkPassword(validatedUserDetails.password, userAlreadyExist.password.toString())

    if (!passwordMatch) throw CreateError.BadRequest('Incorrect email/password combination')

    const { signedAccessToken, signedRefreshToken } = generateLoginToken(validatedUserDetails.email)

    res.json({
      accessToken: signedAccessToken,
      refreshToken: signedRefreshToken,
    })
  } catch (error) {
    if (error.isJoi === true) error.status = 422
    next(error)
  }
}

export const me: RequestHandler = async (req, res, next) => {
  try {
    const userDetails = await userInfo(req.currentUser.email)

    res.json({
      userDetails: {
        email: userDetails.email,
        createdAt: userDetails.createdAt,
        modifiedAt: userDetails.modifiedAt,
        apiKey: userDetails.apiKey,
        isBanned: userDetails.isBanned,
      },
    })
  } catch (error) {
    next(error)
  }
}
