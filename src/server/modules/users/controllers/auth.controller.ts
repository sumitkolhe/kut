import { AuthService } from 'server/modules/users/services'
import type { NextFunction, Request, RequestHandler, Response } from 'express'
import type { CustomResponse } from 'server/common/types/response.interface'
import type { AccessTokenDto, AuthTokenDto, UserRegisterDto } from 'server/modules/users/dto'

export class AuthController {
  private readonly authService: AuthService
  constructor() {
    this.authService = new AuthService()
  }

  public register: RequestHandler = async (
    req: Request,
    res: Response<CustomResponse<null>>,
    next: NextFunction
  ) => {
    try {
      const { email, password }: UserRegisterDto = req.body

      await this.authService.register({ email, password })

      return res.json({
        status: 'SUCCESS',
        message: 'user registered successfully',
        data: null,
      })
    } catch (error) {
      next(error)
    }
  }

  public login: RequestHandler = async (
    req: Request,
    res: Response<CustomResponse<AuthTokenDto>>,
    next: NextFunction
  ) => {
    try {
      const { email, password } = req.body

      const { accessToken, refreshToken } = await this.authService.login({
        email,
        password,
      })

      return res.json({
        status: 'SUCCESS',
        message: null,
        data: { accessToken, refreshToken },
      })
    } catch (error) {
      next(error)
    }
  }

  public loginWithGithub: RequestHandler = async (
    req: Request,
    res: Response<CustomResponse<AuthTokenDto>>,
    next: NextFunction
  ) => {
    try {
      const { code } = req.body

      const { accessToken, refreshToken } = await this.authService.loginWithGithub({ code })

      return res.json({
        status: 'SUCCESS',
        message: 'user registered successfully',
        data: { accessToken, refreshToken },
      })
    } catch (error) {
      next(error)
    }
  }

  public refreshToken: RequestHandler = async (
    req: Request,
    res: Response<CustomResponse<AccessTokenDto>>,
    next: NextFunction
  ) => {
    try {
      const { refreshToken } = req.body

      const { accessToken } = await this.authService.refreshToken({ refreshToken })

      return res.json({ status: 'SUCCESS', message: null, data: { accessToken } })
    } catch (error) {
      next(error)
    }
  }

  public verifyAccount: RequestHandler = async (
    req: Request,
    res: Response<CustomResponse<null>>,
    next: NextFunction
  ) => {
    try {
      const { token } = req.query

      await this.authService.verifyAccount({ verificationToken: token as string })

      return res.json({
        status: 'SUCCESS',
        message: 'account verified successfully',
        data: null,
      })
    } catch (error) {
      next(error)
    }
  }

  public resendVerificationEmail: RequestHandler = async (
    req: Request,
    res: Response<CustomResponse<null>>,
    next: NextFunction
  ) => {
    try {
      const { userId } = req.auth

      await this.authService.resendEmailVerification(userId)

      return res.json({
        status: 'SUCCESS',
        message: 'verification email sent successfully',
        data: null,
      })
    } catch (error) {
      next(error)
    }
  }
}
