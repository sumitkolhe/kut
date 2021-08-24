import { Router } from 'express'
import { loginUser, me, registerUser } from '@server/controller/auth.controller'
import { checkAuthentication } from '@server/middleware/authentication'

export const authRouter = Router()

authRouter.get('/me', checkAuthentication, me)
authRouter.post('/login', loginUser)
authRouter.post('/register', registerUser)
