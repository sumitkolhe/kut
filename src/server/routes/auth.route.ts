import { Router } from 'express'
import { AuthController } from 'controllers/auth.controller'
import type { Routes } from 'interfaces/routes.interface'

export class AuthRoute implements Routes {
  public path = '/auth'
  public router = Router()
  public authController = new AuthController()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/register`, this.authController.register)
  }
}
