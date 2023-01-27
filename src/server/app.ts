/* eslint-disable @typescript-eslint/no-namespace */
import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import { errorMiddleware } from 'server/middlewares/error.middleware'
import { useConfig } from 'server/configs'
import timeout from 'express-timeout-handler'
import useragent from 'express-useragent'
import type { Statistics } from 'interfaces/statistics.interface'
import type { Response } from 'express'
import type { Config } from 'interfaces/config.interface'
import type { Routes } from 'interfaces/routes.interface'

declare global {
  namespace Express {
    interface Request {
      auth: {
        userId: string
        email: string
      }
      timedout: boolean
      statistics?: Statistics | undefined
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
    this.initializeRouteFallback()
    this.initializeErrorHandling()
  }

  private initializeMiddlewares() {
    this.app.use(useragent.express())
    this.app.use(morgan(this.config.log.format))
    this.app.use(
      cors({
        origin: this.config.cors.origin,
        credentials: this.config.cors.credentials,
      })
    )
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(
      timeout.handler({
        timeout: 9000,
        onTimeout(req: Request, res: Response) {
          res.status(503).json({
            status: 'FAILED',
            message: 'request timeout',
            data: null,
          })
        },
      })
    )
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use('/api/v1', route.router)
    })
  }

  private initializeRouteFallback() {
    this.app.use((req, res) => {
      res.status(404).json({
        status: 'FAILED',
        message: 'route not found',
        data: null,
      })
    })
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware)
  }

  public getServer() {
    return this.app
  }
}
