import bcrypt from 'bcryptjs'
import { ErrorType } from 'interfaces/error.interface'
import { logger } from 'server/common/utils/logger'
import { HttpExceptionError } from 'server/common/exceptions/http.exception'
import { UserModel } from 'server/modules/users/models/user.model'
import { EmailService } from 'server/modules/users/services/email.service'
import {
  signAccessToken,
  signRefreshToken,
  verifyAccountVerificationToken,
  verifyRefreshToken,
} from 'server/modules/users/utils/token.util'
import type { Tokens } from 'interfaces/token.interface'
import type { User } from 'interfaces/user.interface'

export class AuthService {
  private readonly emailService: EmailService
  constructor() {
    this.emailService = new EmailService()
  }

  public register = async (user: Pick<User, 'email' | 'password'>): Promise<void> => {
    const ifUserExist = await UserModel.findOne({ email: user.email })

    if (ifUserExist) throw new HttpExceptionError(409, ErrorType.emailAlreadyExists)

    const salt = await bcrypt.genSalt(10)

    const hashedPassword = await bcrypt.hash(user.password, salt)

    const newUser = new UserModel({
      email: user.email,
      password: hashedPassword,
    })

    await newUser.save().catch((error) => {
      logger.error(`error creating user: ${error}`)
      throw new HttpExceptionError(500, `error creating user`)
    })

    await this.emailService.sendVerificationEmail(user.email, user.email) // TODO: change to user
  }

  public login = async (user: Pick<User, 'email' | 'password'>): Promise<Tokens> => {
    const foundUser = await UserModel.findOne({ email: user.email })

    if (!foundUser) throw new HttpExceptionError(404, ErrorType.userNotFound)

    const comparePassword = await bcrypt.compare(user.password, foundUser.password.toString())

    if (!comparePassword) throw new HttpExceptionError(400, ErrorType.incorrectLoginCredentials)

    const signedAccessToken = await signAccessToken({ email: user.email })
    const signedRefreshToken = await signRefreshToken({ email: user.email })

    return { accessToken: signedAccessToken, refreshToken: signedRefreshToken }
  }

  public me = async (email: string): Promise<User> => {
    const userDetails = await UserModel.findOne(
      { email },
      {
        _id: false,
        __v: false,
        userLinks: false,
        apiKey: false,
        password: false,
      }
    )

    if (!userDetails) throw new HttpExceptionError(404, ErrorType.userNotFound)

    return userDetails.toObject<User>()
  }

  public refreshToken = async (refreshToken: string): Promise<{ accessToken: string }> => {
    const decodedToken = await verifyRefreshToken(refreshToken).catch(() => {
      throw new HttpExceptionError(400, ErrorType.invalidRefreshToken)
    })

    const foundUser = await UserModel.findOne({ email: decodedToken.email })

    if (!foundUser) throw new HttpExceptionError(404, ErrorType.userNotFound)

    const signedAccessToken = await signAccessToken({
      email: decodedToken.email,
    })

    return { accessToken: signedAccessToken }
  }

  public resendEmailVerification = async (email: string): Promise<void> => {
    const userDetails = await UserModel.findOne(
      { email },
      {
        _id: false,
        __v: false,
        userLinks: false,
        apiKey: false,
        password: false,
      }
    )

    if (!userDetails) throw new HttpExceptionError(404, ErrorType.userNotFound)

    await this.emailService
      .sendVerificationEmail(userDetails.email, userDetails.email) // TODO: change to user
      .catch((error) => {
        logger.error('error sending verification email', error)
        throw new HttpExceptionError(500, ErrorType.somethingWentWrong)
      })
  }

  public verifyAccount = async (verificationToken: string): Promise<void> => {
    const decodedToken = await verifyAccountVerificationToken(verificationToken).catch(() => {
      throw new HttpExceptionError(400, ErrorType.invalidVerifyToken)
    })

    const foundUser = await UserModel.findOne({ email: decodedToken.email })

    if (!foundUser) throw new HttpExceptionError(404, ErrorType.userNotFound)

    await foundUser.updateOne({
      $set: { isVerified: true },
    })
  }
}
