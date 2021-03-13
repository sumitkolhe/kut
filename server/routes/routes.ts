import express from 'express'
import { authRoutes } from '@controller/routes/auth.routes'
import { controllerRoutes } from '@controller/routes/services.routes'

export const routes = express.Router()

routes.use('/', controllerRoutes.redirect)
routes.use('/api', controllerRoutes.shorten)
routes.use('/api', controllerRoutes.anonshorten)
routes.use('/api', controllerRoutes.analytics)
routes.use('/api', controllerRoutes.statistics)
routes.use('/api', controllerRoutes.notification)
routes.use('/api', controllerRoutes.getLinks)
routes.use('/api', controllerRoutes.updateLink)
routes.use('/api', controllerRoutes.deleteLink)
routes.use('/api', controllerRoutes.getNotes)
routes.use('/api', controllerRoutes.createNote)
routes.use('/api', controllerRoutes.deleteNote)
routes.use('/api', controllerRoutes.updateNote)
routes.use('/api/auth', authRoutes.login)
routes.use('/api/auth', authRoutes.register)
routes.use('/api/auth', authRoutes.me)
routes.use('/api/auth', authRoutes.delete)
