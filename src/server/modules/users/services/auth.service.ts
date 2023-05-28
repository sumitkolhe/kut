import { RegisterUserUseCase } from 'server/modules/users/use-cases/register/register.use-case'
import { LoginUserUseCase } from 'server/modules/users/use-cases/login/login.use-case'
import { RefreshTokenUseCase } from 'server/modules/users/use-cases/refresh-token/refresh-token.use-case'
import { ResendAccountVerificationEmailUseCase } from 'server/modules/users/use-cases/resend-verification-email/resend-verification-email.use-case'
import { VerifyAccountUseCase } from 'server/modules/users/use-cases/verify-account/verify-account.use-case'
import { LoginWithGithubUseCase } from 'server/modules/users/use-cases/login-github/login-with-github.use-case'
import type { UserRegisterDto } from 'server/modules/users/dto/register.dto'
import type { UserGithubLoginDto, UserLoginDto } from 'server/modules/users/dto/login.dto'
import type { RefreshTokenDto, VerificationTokenDto } from 'server/modules/users/dto/token.dto'

export class AuthService {
  private readonly registerUseCase: RegisterUserUseCase
  private readonly loginWithGithubUseCase: LoginWithGithubUseCase
  private readonly loginUseCase: LoginUserUseCase
  private readonly refreshTokenUseCase: RefreshTokenUseCase
  private readonly resendAccountVerificationEmailUseCase: ResendAccountVerificationEmailUseCase
  private readonly verifyAccountUseCase: VerifyAccountUseCase

  constructor() {
    this.registerUseCase = new RegisterUserUseCase()
    this.loginUseCase = new LoginUserUseCase()
    this.refreshTokenUseCase = new RefreshTokenUseCase()
    this.resendAccountVerificationEmailUseCase = new ResendAccountVerificationEmailUseCase()
    this.verifyAccountUseCase = new VerifyAccountUseCase()
    this.loginWithGithubUseCase = new LoginWithGithubUseCase()
  }

  public register = async (user: UserRegisterDto) => {
    return this.registerUseCase.execute(user)
  }

  public loginWithGithub = async (code: UserGithubLoginDto) => {
    return this.loginWithGithubUseCase.execute(code)
  }

  public login = async (user: UserLoginDto) => {
    return this.loginUseCase.execute(user)
  }

  public refreshToken = async (refreshToken: RefreshTokenDto) => {
    return this.refreshTokenUseCase.execute(refreshToken)
  }

  public verifyAccount = async (verificationToken: VerificationTokenDto) => {
    return this.verifyAccountUseCase.execute(verificationToken)
  }

  public resendEmailVerification = async (userId: string) => {
    return this.resendAccountVerificationEmailUseCase.execute(userId)
  }
}
