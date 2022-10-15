import { Router } from 'express'
import { AuthController } from 'server/controllers/auth.controller'
import { checkAuthentication } from 'server/middlewares/auth.middleware'
import {
  loginSchema,
  refreshTokenSchema,
  registerationSchema,
  verifyAccountSchema,
} from 'server/helpers/validator.helper'
import type { Routes } from 'interfaces/routes.interface'

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
    this.router.get(`${this.path}/verify`, verifyAccountSchema, this.authController.verifyAccount)
    this.router.get(`${this.path}/me`, checkAuthentication, this.authController.me)
    this.router.get(`${this.path}/logout`, this.authController.logout)
  }
}
