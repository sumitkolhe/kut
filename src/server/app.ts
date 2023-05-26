/* eslint-disable @typescript-eslint/no-namespace */
import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import timeout from 'express-timeout-handler'
import useragent from 'express-useragent'
import nocache from 'nocache'
import { useConfig } from 'server/common/configs'
import { errorMiddleware } from 'server/common/middlewares/error.middleware'
import type { Statistics } from '~/server/common/types/statistics.interface'
import type { Response } from 'express'
import type { Config } from 'server/common/types/config.type'
import type { Routes } from 'server/common/types/routes.interface'

declare global {
  namespace Express {
    interface Request {
      auth: {
        userId: string
        email: string
        isVerified: boolean
        isBanned: boolean
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
    this.env = this.config.env
    this.app = express()
    this.initializeMiddlewares()
    this.initializeRoutes(routes)
    this.initializeRouteFallback()
    this.initializeErrorHandler()
  }

  private initializeMiddlewares() {
    const middlewares = [
      useragent.express(),
      morgan(this.config.log.format),
      cors({
        origin: this.config.cors.origin,
        credentials: this.config.cors.credentials,
      }),
      express.json(),
      express.urlencoded({ extended: true }),
      nocache(),
      timeout.handler({
        timeout: 9000,
        onTimeout(req: Request, res: Response) {
          res.status(503).json({
            status: 'FAILED',
            message: 'request timeout',
            data: null,
          })
        },
      }),
    ]

    this.app.use(middlewares)
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use('/api/v1', route.router)
    })
  }

  private initializeRouteFallback() {
    this.app.use((_req, res) => {
      res.status(404).json({
        status: 'FAILED',
        message: 'route not found',
        data: null,
      })
    })
  }

  private initializeErrorHandler() {
    this.app.use(errorMiddleware)
  }

  public getServer() {
    return this.app
  }
}
