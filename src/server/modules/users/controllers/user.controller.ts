import { AuthService } from 'server/modules/auth/services/auth.service'
import type { User } from 'interfaces/user.interface'
import type { NextFunction, Request, RequestHandler, Response } from 'express'
import type { CustomResponse } from 'interfaces/response.interface'

export class UserController {
  private readonly authService: AuthService

  constructor() {
    this.authService = new AuthService()
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
}
