import express from 'express'
import { redirect } from '@controller/services/redirect'
import { shorten } from '@controller/services/shorten'
import { verifyToken } from '@middleware/verify-token'
import { analytics } from '@controller/services/analytics'
import { userAgent } from '@middleware/user-agent'
import { links } from '@controller/services/links'
import { statistics } from '@controller/services/statistics'

const router = express.Router()

export const controllerRoutes = {
	links: router.get('/links', verifyToken, links),
	statistics: router.get('/stats', verifyToken, statistics),
	redirect: router.get('/:alias', userAgent, redirect),
	shorten: router.post('/shorten', verifyToken, shorten),
	analytics: router.post('/analytics', verifyToken, analytics),
}
