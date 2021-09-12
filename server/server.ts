import { config } from 'dotenv-safe'
import express, { Application, json, urlencoded } from 'express'
import cors from 'cors'
import next from 'next'
import { morganMiddleware } from '@server/middleware/morgan'
import { HandleError } from '@server/middleware/errorHandler'
import { routes } from '@server/routes/routes'
import { connectDatabase } from '@server/helpers/connectDatabase'
import { isDev } from '@server/utils/isDev'
import { Logger } from '@server/utils/logger'
// eslint-disable-next-line import/order
import { expressConfig } from '@server/config/express'

config({ allowEmptyValues: true })
import { CurrentUser } from '@server/interfaces/user'
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      currentUser: CurrentUser
    }
  }
}
const dev = isDev()
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()

nextApp.prepare().then(() => {
  const app: Application = express()
  connectDatabase()
  app.use(json())
  app.use(cors())
  app.use(urlencoded({ extended: true }))
  app.use(morganMiddleware)
  app.use(routes)
  // eslint-disable-next-line @typescript-eslint/no-shadow
  app.use((err: express.ErrorRequestHandler, req: express.Request, res: express.Response, next: express.NextFunction) =>
    HandleError(err, req, res, next)
  )

  app.all('*', (req: express.Request, res: express.Response) => handle(req, res))

  app.listen(expressConfig.serverPort, () => {
    Logger.info(`🚀 Ready on ${expressConfig.serverProtocol}://${expressConfig.serverHost}:${expressConfig.serverPort}`)
  })
})
