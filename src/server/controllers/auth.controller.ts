import { AuthService } from 'services/auth.service'
import type { User } from 'interfaces/user.interface'
import type { CookieOptions, NextFunction, Request, RequestHandler, Response } from 'express'
import type { CustomResponse } from 'interfaces/response.interface'
import type { Token, Tokens } from 'interfaces/token.interface'

export class AuthController {
  private authService: AuthService
  private cookieOptions: CookieOptions

  constructor() {
    this.authService = new AuthService()
    this.cookieOptions = {
      httpOnly: true,
      path: '/',
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    }
  }

  public login: RequestHandler = async (
    req: Request,
    res: Response<CustomResponse<Tokens>>,
    next: NextFunction
  ) => {
    try {
      const { email, password } = req.body

      const { accessToken, refreshToken } = await this.authService.login({ email, password })

      return res
        .cookie('accessToken', accessToken, this.cookieOptions)
        .cookie('refreshToken', refreshToken, this.cookieOptions)
        .json({ status: 'SUCCESS', message: null, data: { accessToken, refreshToken } })
    } catch (error) {
      next(error)
    }
  }

  public logout: RequestHandler = async (
    req: Request,
    res: Response<CustomResponse<null>>,
    next: NextFunction
  ) => {
    try {
      return res
        .clearCookie('accessToken', this.cookieOptions)
        .clearCookie('refreshToken', this.cookieOptions)
        .json({ status: 'SUCCESS', message: 'user logged out', data: null })
    } catch (error) {
      next(error)
    }
  }

  public register: RequestHandler = async (
    req: Request,
    res: Response<CustomResponse<null>>,
    next: NextFunction
  ) => {
    try {
      const { firstName, lastName, email, password }: User = req.body

      await this.authService.register({ firstName, lastName, email, password })

      return res.json({ status: 'SUCCESS', message: 'user registered successfully', data: null })
    } catch (error) {
      next(error)
    }
  }

  public me: RequestHandler = async (
    req: Request,
    res: Response<CustomResponse<User>>,
    next: NextFunction
  ) => {
    try {
      const { email } = req.auth

      const userDetails = await this.authService.me(email)

      return res.json({ status: 'SUCCESS', message: null, data: userDetails })
    } catch (error) {
      next(error)
    }
  }

  public refreshToken: RequestHandler = async (
    req: Request,
    res: Response<CustomResponse<Token>>,
    next: NextFunction
  ) => {
    try {
      const { refreshToken } = req.body

      const { accessToken } = await this.authService.refreshToken(refreshToken)

      return res
        .cookie('accessToken', accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
        })
        .json({ status: 'SUCCESS', message: null, data: { accessToken } })
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

      await this.authService.verifyAccount(token as string)

      return res.json({ status: 'SUCCESS', message: 'account verified successfully', data: null })
    } catch (error) {
      next(error)
    }
  }
}
