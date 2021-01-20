import express from 'express'
import consola from 'consola'
import useragent from 'express-useragent'
//import serveStatic from 'serve-static'
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

const start = async () => {
	const nuxt = await loadNuxt(isDev ? 'dev' : 'start')
	const HOST = config.SERVER_HOST
	const PORT = config.SERVER_PORT
	if (isDev) {
		build(nuxt)
	} else {
		await nuxt.ready()
	}

	app.get('/:alias', (req, res) => {
		nuxt.renderRoute('/top', { req }).then((result: { html: any }) => {
			res.send(result.html)
		})
	})

	app.use(nuxt.render)
	app.listen(PORT as number, HOST)
	consola.ready({
		message: `Server listening on http://${HOST}:${PORT}`,
		badge: true,
	})
}

start()
