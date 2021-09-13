import { Router } from 'express'
import { authRouter } from '@server/routes/auth.routes'
import { linkRouter } from '@server/routes/link.routes'
import { userRouter } from '@server/routes/user.routes'

export const routes = Router()

routes.use('/api/auth', authRouter)
routes.use('/api', linkRouter)
routes.use('/api/user', userRouter)
