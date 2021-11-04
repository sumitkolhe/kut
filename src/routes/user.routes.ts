import { Router } from 'express'
import { checkAuthentication } from 'src/middleware/authentication'
import { userInfo } from 'src/controller/user.controller'

export const userRouter = Router()

userRouter.get('/me', checkAuthentication, userInfo)
