import { Router } from 'express'
import { AuthController } from 'controllers/auth.controller'
import { validate } from 'middlewares/validate.middleware'
import { object, string, z } from 'zod'
import type { Routes } from 'interfaces/routes.interface'

const regsiterationSchema = z.object({
  body: object({
    firstName: string({
      required_error: 'first name is required',
    }),

    lastName: string({
      required_error: 'last name is required',
    }),

    email: string({
      required_error: 'email is required',
    }).email('invalid email address'),

    password: string({
      required_error: 'password is required',
    }).min(6, 'password too short - should be 6 chars minimum'),
  }),
})

const loginSchema = z.object({
  body: object({
    email: string({
      required_error: 'email is required',
    }).email('invalid email address'),

    password: string({
      required_error: 'password is required',
    }).min(6, 'password too short - should be 6 chars minimum'),
  }),
})

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
  }
}