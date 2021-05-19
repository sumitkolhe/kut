import express from 'express'
import consola from 'consola'
import useragent from 'express-useragent'
import serveStatic from 'serve-static'
// @ts-ignore
import { loadNuxt, build } from 'nuxt'
import { config } from '@config/config'
import { routes } from '@routes/routes'
import { connectDatabase } from '@helpers/init-database'
import { setHeaders } from '@middleware/header'
import { HandleError } from '@middleware/error-handler'

declare global {
	namespace Express {
		interface Request {
			auth_data: any
		}
	}
}

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
	app.get(/.*/, (_req, res) => res.sendFile(__dirname + '/nuxt/404.html'))
	const PORT = config.SERVER_PORT

	// Listen the server
	app.listen(PORT)
	consola.ready({
		message: `Server listening on PORT:${PORT}`,
		badge: true,
	})
}

if (isDev) startDevServer()
else startProdServer()
