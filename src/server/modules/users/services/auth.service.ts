import { ErrorType } from 'interfaces/error.interface'
import { HttpExceptionError } from 'server/common/exceptions/http.exception'
import { UserModel } from 'server/modules/users/models/user.model'
import {
  signAccessToken,
  verifyAccountVerificationToken,
  verifyRefreshToken,
} from 'server/modules/users/utils/token.util'
import { RegisterUserUseCase } from 'server/modules/users/use-cases/register/register.use-case'
import { LoginUserUseCase } from 'server/modules/users/use-cases/login/login.use-case'
import type { Tokens } from 'interfaces/token.interface'
import type { User } from 'interfaces/user.interface'

export class AuthService {
  private readonly registerUserUseCase: RegisterUserUseCase
  private readonly loginUserUseCase: LoginUserUseCase

  constructor() {
    this.registerUserUseCase = new RegisterUserUseCase()
    this.loginUserUseCase = new LoginUserUseCase()
  }

  public register = async (user: Pick<User, 'email' | 'password'>): Promise<void> => {
    return this.registerUserUseCase.execute(user)
  }

  public login = async (user: Pick<User, 'email' | 'password'>): Promise<Tokens> => {
    return this.loginUserUseCase.execute(user)
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

    // await this.emailService
    //   .sendVerificationEmail(userDetails.email, userDetails.email) // TODO: change to user
    //   .catch((error) => {
    //     logger.error('error sending verification email', error)
    //     throw new HttpExceptionError(500, ErrorType.somethingWentWrong)
    //   })
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
