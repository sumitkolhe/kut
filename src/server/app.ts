/* eslint-disable @typescript-eslint/no-namespace */
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import { errorMiddleware } from 'middlewares/error.middleware'
import { useConfig } from 'configs'
import type { Config } from 'interfaces/config.interface'
import type { Routes } from 'interfaces/routes.interface'

declare global {
  namespace Express {
    interface Request {
      auth: any
    }
  }
}

export class App {
  public app: express.Application
  public config: Config
  public env: string

  constructor(routes: Routes[]) {
    this.config = useConfig()
    this.app = express()
    this.env = this.config.env

    this.initializeMiddlewares()
    this.initializeRoutes(routes)
    this.initializeErrorHandling()
  }

  private initializeMiddlewares() {
    this.app.use(helmet())
    this.app.use(morgan(this.config.log.format))
    this.app.use(cors({ origin: this.config.cors.origin, credentials: this.config.cors.credentials }))
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use('/', route.router)
    })
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware)
  }

  public getServer() {
    return this.app
  }
}
