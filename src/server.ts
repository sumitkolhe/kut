import { config } from 'dotenv-safe'
import express, { Application, json, urlencoded } from 'express'
import cors from 'cors'
import nextApp from 'next'
import { morganMiddleware } from 'src/middleware/morgan'
import { HandleError } from 'src/middleware/errorHandler'
import { routes } from 'src/routes/routes'
import { connectDatabase } from 'src/helpers/connectDatabase'
import { isDev } from 'src/utils/isDev'
import { Logger } from 'src/utils/logger'
import { expressConfig } from 'src/config/express'
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
const dev = isDev()
const nextServer = nextApp({ dev })
const handle = nextServer.getRequestHandler()

nextServer.prepare().then(() => {
  const app: Application = express()
  connectDatabase()
  app.use(json())
  app.use(cors())
  app.use(urlencoded({ extended: true }))
  app.use(morganMiddleware)
  app.use(routes)
  app.use((err: express.ErrorRequestHandler, req: express.Request, res: express.Response, next: express.NextFunction) =>
    HandleError(err, req, res, next)
  )

  app.all('*', (req: express.Request, res: express.Response) => handle(req, res))

  app.listen(expressConfig.serverPort, () => {
    Logger.info(`🚀 Ready on ${expressConfig.serverProtocol}://${expressConfig.serverHost}:${expressConfig.serverPort}`)
  })
})
