import { Router } from 'express'
import { checkAuthentication } from 'server/common/middlewares/auth.middleware'
import { AuthController } from 'server/modules/auth/controllers/auth.controller'
import type { Routes } from 'interfaces/routes.interface'
import {
  loginSchema,
  refreshTokenSchema,
  registerationSchema,
  verifyAccountSchema,
} from '~/server/common/helpers/validator.helper'

export class AuthRoute implements Routes {
  public path = '/auth'
  public router = Router()
  public authController = new AuthController()
  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/register`, registerationSchema, this.authController.register)
    this.router.post(`${this.path}/login`, loginSchema, this.authController.login)
    this.router.post(
      `${this.path}/refresh-token`,
      refreshTokenSchema,
      this.authController.refreshToken
    )
    this.router.post(
      `${this.path}/resend-verification-email`,
      checkAuthentication,
      this.authController.resendVerificationEmail
    )
    this.router.post(
      `${this.path}/verify-email`,
      verifyAccountSchema,
      this.authController.verifyAccount
    )
    this.router.get(`${this.path}/me`, checkAuthentication, this.authController.me)
  }
}
