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
import { expressConfig } from '@server/config/express'

config({ allowEmptyValues: true })

const dev = isDev()
const nextApp = next({ dir: './src/client', dev })
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

  app.all('*', (req: express.Request, res: express.Response) => {
    return handle(req, res)
  })

  app.listen(expressConfig.SERVER_PORT, () => {
    Logger.info(`> Ready on http://localhost:${expressConfig.SERVER_PORT}`)
  })
})
