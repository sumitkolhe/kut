import express from 'express'
import consola from 'consola'
import useragent from 'express-useragent'
import serveStatic from 'serve-static'
// @ts-ignore
import { loadNuxt, build } from 'nuxt'
import { config } from '@config/config'
import { routes } from '@routes/routes'
import { connectDatabase } from '@utils/initDatabase'
import { setHeaders } from '@middleware/header'
import { HandleError } from '@middleware/errorHandler'

const isDev = process.env.NODE_ENV !== 'production'
const app = express()

connectDatabase()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(setHeaders)
app.use(useragent.express())

app.use(routes)

app.use(
	(
		err: express.ErrorRequestHandler,
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) => HandleError(err, req, res, next)
)

const startDevServer = async () => {
	const nuxt = await loadNuxt('dev')
	const { host, port } = nuxt.options.server

	build(nuxt)
	await nuxt.ready()

	// Give nuxt middleware to express
	app.use(nuxt.render)

	// Listen the server
	app.listen(port, host)
	consola.ready({
		message: `Server listening on http://${host}:${port}`,
		badge: true,
	})
}

const startProdServer = async () => {
	app.use(serveStatic(__dirname + '/nuxt'))

	const HOST: any = config.SERVER_HOST
	const PORT = config.SERVER_PORT

	// Listen the server
	app.listen(PORT, HOST)
	consola.ready({
		message: `Server listening on http://${HOST}:${PORT}`,
		badge: true,
	})
}

if (isDev) startDevServer()
else startProdServer()
