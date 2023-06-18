import { Router } from 'express'
import { checkAuthentication } from 'server/common/middlewares/auth.middleware'
import { UserController } from 'server/modules/users/controllers'
import type { Routes } from 'server/common/types/routes.interface'

export class UserRoute implements Routes {
  public path = '/user'
  public router = Router()
  public userController = new UserController()
  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/me`, checkAuthentication, this.userController.me)
  }
}
