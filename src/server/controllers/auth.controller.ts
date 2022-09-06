import { AuthService } from 'services/auth.service'
import type { NextFunction, Request, RequestHandler, Response } from 'express'

export class AuthController {
  private authService = new AuthService()

  public login: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { email, password } = req.body

      const signedAccessToken = await this.authService.login({ email, password })

      res.json({ status: 'SUCCESS', message: null, data: { accessToken: signedAccessToken } })
    } catch (error) {
      next(error)
    }
  }

  public register: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { firstName, lastName, email, password } = req.body

      await this.authService.register({ firstName, lastName, email, password })

      res.json({ status: 'SUCCESS', message: 'user registered successfully', data: null })
    } catch (error) {
      next(error)
    }
  }
}