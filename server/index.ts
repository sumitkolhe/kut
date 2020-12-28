import express from 'express'
import consola from 'consola'
import useragent from 'express-useragent'
import { routes } from '@routes/routes'
import { connectDatabase } from '@utils/database'
import { setHeaders } from '@middleware/header'
import { HandleError } from '@middleware/errorHandler'

const { Nuxt, Builder } = require('nuxt')
const app = express()
connectDatabase()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(useragent.express())
app.use(setHeaders)
app.use(routes)

app.use(
  (
    err: express.ErrorRequestHandler,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => HandleError(err, req, res, next)
)

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true,
  })
}
start()
