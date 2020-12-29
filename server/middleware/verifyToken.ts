import express from 'express'
import Jwt from 'jsonwebtoken'
import { AppConfig } from '@config/config'
import { CreateError } from '@middleware/errorHandler'

export const verifyToken = (
  req: express.Request,
  _res: express.Response,
  next: express.NextFunction
) => {
  const authHeader = req.headers['authorization']
  const authToken = authHeader && authHeader.split(' ')[1]
  if (!authToken) throw CreateError.Forbidden()

  try {
    const tokenDetails = Jwt.verify(authToken, AppConfig.ACCESS_TOKEN_SECRET)
    req.body.auth = tokenDetails
    next()
  } catch (error) {
    throw CreateError.NotFound('Authorization token invalid')
  }
}
