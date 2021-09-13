import { Router } from 'express'
import { checkAuthentication } from '@server/middleware/authentication'
import { userInfo } from '@server/controller/user.controller'

export const userRouter = Router()

userRouter.get('/me', checkAuthentication, userInfo)
