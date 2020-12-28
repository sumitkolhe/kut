import express from 'express'
import { authRoutes } from '@controller/routes/auth.routes'
import { controllerRoutes } from '@controller/routes/services.routes'

export const routes = express.Router()

routes.use('/redirect', controllerRoutes.redirect)
routes.use('/', controllerRoutes.shorten)
routes.use('/', controllerRoutes.analytics)
routes.use('/', controllerRoutes.links)
routes.use('/api/auth', authRoutes.login)
routes.use('/api/auth', authRoutes.register)
routes.use('/api/auth', authRoutes.me)
