import { Router } from 'express'
import { AuthController } from 'controllers/auth.controller'
import { validate } from 'middlewares/validate.middleware'
import { checkAuthentication } from 'middlewares/auth.middleware'
import { loginSchema, refreshTokenSchema, regsiterationSchema, verifyAccountSchema } from 'helpers/validator.helper'
import type { Routes } from 'interfaces/routes.interface'

export class AuthRoute implements Routes {
  public path = '/auth'
  public router = Router()
  public authController = new AuthController()
  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/register`, validate(regsiterationSchema), this.authController.register)
    this.router.post(`${this.path}/login`, validate(loginSchema), this.authController.login)
    this.router.post(`${this.path}/refresh-token`, validate(refreshTokenSchema), this.authController.refreshToken)
    this.router.get(`${this.path}/verify`, validate(verifyAccountSchema), this.authController.verifyAccount)
    this.router.get(`${this.path}/me`, checkAuthentication, this.authController.me)
  }
}
