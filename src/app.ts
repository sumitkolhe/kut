import { config } from 'dotenv-safe'
import express, { Application, json, urlencoded } from 'express'
import cors from 'cors'
import { morganMiddleware } from 'src/middleware/morgan'
import { CreateError, HandleError } from 'src/middleware/errorHandler'
import { routes } from 'src/routes/routes'
import { connectDatabase } from 'src/helpers/connectDatabase'
import { CurrentUser } from 'src/interfaces/user'

config({ allowEmptyValues: true })

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      currentUser: CurrentUser
    }
  }
}

export const createApp = async (): Promise<Application> => {
  const app: Application = express()
  connectDatabase()
  app.use(json())
  app.use(cors())
  app.use(urlencoded({ extended: true }))
  app.use(morganMiddleware)

  app.use(routes)
  app.use((req, res, next) => {
    next(CreateError.NotFound('Not Found'))
  })
  app.use((err: express.ErrorRequestHandler, req: express.Request, res: express.Response, next: express.NextFunction) =>
    HandleError(err, req, res, next)
  )
  return app
}
