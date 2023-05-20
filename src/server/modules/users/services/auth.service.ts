import { RegisterUserUseCase } from 'server/modules/users/use-cases/register/register.use-case'
import { LoginUserUseCase } from 'server/modules/users/use-cases/login/login.use-case'
import { RefreshTokenUseCase } from 'server/modules/users/use-cases/refresh-token/refresh-token.use-case'
import { ResendAccountVerificationEmailUseCase } from 'server/modules/users/use-cases/resend-verification-email/resend-verification-email.use-case'
import { VerifyAccountUseCase } from 'server/modules/users/use-cases/verify-account/verify-account.use-case'
import type { User } from 'server/modules/users/models/user.model'
import type { ObjectId } from 'mongodb'
import type { Tokens } from 'interfaces/token.interface'

export class AuthService {
  private readonly registerUserUseCase: RegisterUserUseCase
  private readonly loginUserUseCase: LoginUserUseCase
  private readonly refreshTokenUseCase: RefreshTokenUseCase
  private readonly resendAccountVerificationEmailUseCase: ResendAccountVerificationEmailUseCase
  private readonly verifyAccountUseCase: VerifyAccountUseCase

  constructor() {
    this.registerUserUseCase = new RegisterUserUseCase()
    this.loginUserUseCase = new LoginUserUseCase()
    this.refreshTokenUseCase = new RefreshTokenUseCase()
    this.resendAccountVerificationEmailUseCase = new ResendAccountVerificationEmailUseCase()
    this.verifyAccountUseCase = new VerifyAccountUseCase()
  }

  public register = async (user: Pick<User[0], 'email' | 'password'>): Promise<void> => {
    return this.registerUserUseCase.execute(user)
  }

  public login = async (user: Pick<User[0], 'email' | 'password'>): Promise<Tokens> => {
    return this.loginUserUseCase.execute(user)
  }

  public refreshToken = async (refreshToken: string): Promise<{ accessToken: string }> => {
    return this.refreshTokenUseCase.execute(refreshToken)
  }

  public verifyAccount = async (verificationToken: string): Promise<void> => {
    return this.verifyAccountUseCase.execute(verificationToken)
  }

  public resendEmailVerification = async (userId: ObjectId): Promise<void> => {
    return this.resendAccountVerificationEmailUseCase.execute(userId)
  }
}
