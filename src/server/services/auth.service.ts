import { UserModel } from 'models/user.model'
import bcrypt from 'bcryptjs'
import { HttpExceptionError } from 'exceptions/http.exception'
import {
  signAccessToken,
  signRefreshToken,
  verifyAccountVerificationToken,
  verifyRefreshToken,
} from 'helpers/token.helper'
import { EmailService } from 'services/email.service'
import { ErrorType } from 'interfaces/error.interface'
import type { Tokens } from 'interfaces/token.interface'
import type { User } from 'interfaces/user.interface'

export class AuthService {
  private emailService: EmailService

  constructor() {
    this.emailService = new EmailService()
  }

  public register = async (user: Pick<User, 'email' | 'password' | 'firstName' | 'lastName'>): Promise<void> => {
    const ifUserExist = await UserModel.findOne({ email: user.email })

    if (ifUserExist) throw new HttpExceptionError(409, ErrorType.emailAlreadyExists)

    const salt = await bcrypt.genSalt(10)

    const hashedPassword = await bcrypt.hash(user.password, salt)

    const newUser = new UserModel({
      email: user.email,
      password: hashedPassword,
      firstName: user.firstName,
      lastName: user.lastName,
    })

    await newUser.save().catch(() => {
      throw new HttpExceptionError(500, 'error creating user')
    })

    await this.emailService.sendVerificationEmail(user.email, user.firstName)
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
      { _id: false, __v: false, userLinks: false, apiKey: false, password: false }
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

    const signedAccessToken = await signAccessToken({ email: decodedToken.email })

    return { accessToken: signedAccessToken }
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
