import { Router } from 'express'
import { loginUser, registerUser, verifyUser } from '@server/controller/auth.controller'
import { validators } from '@server/middleware/validation'
// import { registrationValidator } from '@server/middleware/validation'

export const authRouter = Router()

authRouter.post('/login', validators.auth.login, loginUser)
authRouter.post('/register', validators.auth.registration, registerUser)
authRouter.get('/verify/:token', validators.auth.verification, verifyUser)
