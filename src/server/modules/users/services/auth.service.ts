import { ErrorType } from 'interfaces/error.interface'
import { HttpExceptionError } from 'server/common/exceptions/http.exception'
import { UserModel } from 'server/modules/users/models/user.model'
import { verifyAccountVerificationToken } from 'server/modules/users/utils/token.util'
import { RegisterUserUseCase } from 'server/modules/users/use-cases/register/register.use-case'
import { LoginUserUseCase } from 'server/modules/users/use-cases/login/login.use-case'
import { RefreshTokenUseCase } from 'server/modules/users/use-cases/refresh-token/refresh-token.use-case'
import { ResendAccountVerificationEmailUseCase } from 'server/modules/users/use-cases/resend-verification-email/resend-verification-email.use-case'
import type { Tokens } from 'interfaces/token.interface'
import type { User } from 'interfaces/user.interface'

export class AuthService {
  private readonly registerUserUseCase: RegisterUserUseCase
  private readonly loginUserUseCase: LoginUserUseCase
  private readonly refreshTokenUseCase: RefreshTokenUseCase
  private readonly resendAccountVerificationEmailUseCase: ResendAccountVerificationEmailUseCase

  constructor() {
    this.registerUserUseCase = new RegisterUserUseCase()
    this.loginUserUseCase = new LoginUserUseCase()
    this.refreshTokenUseCase = new RefreshTokenUseCase()
    this.resendAccountVerificationEmailUseCase = new ResendAccountVerificationEmailUseCase()
  }

  public register = async (user: Pick<User, 'email' | 'password'>): Promise<void> => {
    return this.registerUserUseCase.execute(user)
  }

  public login = async (user: Pick<User, 'email' | 'password'>): Promise<Tokens> => {
    return this.loginUserUseCase.execute(user)
  }

  public refreshToken = async (refreshToken: string): Promise<{ accessToken: string }> => {
    return this.refreshTokenUseCase.execute(refreshToken)
  }

  public resendEmailVerification = async (email: string): Promise<void> => {
    return this.resendAccountVerificationEmailUseCase.execute(email)
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
}
