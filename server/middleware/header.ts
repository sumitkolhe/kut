import { RequestHandler } from 'express'

export const setHeaders: RequestHandler = (_req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Headers', '*')
	res.header(
		'Access-Control-Allow-Methods',
		'GET, POST, PUT, DELETE, OPTIONS'
	)
	res.header('Cache-Control', 'no-cache')
	next()
}
