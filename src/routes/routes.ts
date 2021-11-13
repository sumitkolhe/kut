import { Router } from 'express'
import { authRouter } from 'src/routes/auth.routes'
import { linkRouter } from 'src/routes/link.routes'
import { userRouter } from 'src/routes/user.routes'

export const routes = Router()

routes.use('/api/auth', authRouter)
routes.use('/api', linkRouter)
routes.use('/api/user', userRouter)
