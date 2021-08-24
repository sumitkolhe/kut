import { Router } from 'express'
import { authRouter } from '@server/routes/auth.routes'
import { linkRouter } from '@server/routes/link.routes'

export const routes = Router()

routes.use('/api/auth', authRouter)
routes.use('/api/', linkRouter)
