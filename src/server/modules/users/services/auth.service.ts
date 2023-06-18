import {
  LoginUserUseCase,
  LoginWithGithubUseCase,
  RefreshTokenUseCase,
  RegisterUserUseCase,
  ResendAccountVerificationEmailUseCase,
  VerifyAccountUseCase,
} from 'server/modules/users/use-cases'
import type {
  RefreshTokenDto,
  UserGithubLoginDto,
  UserLoginDto,
  UserRegisterDto,
  VerificationTokenDto,
} from 'server/modules/users/dto'

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
