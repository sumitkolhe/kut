import Jwt from 'jsonwebtoken'
import { AppConfig } from '@config/config'

export const signToken = (data: any) => {
  return Jwt.sign(data, AppConfig.ACCESS_TOKEN_SECRET, {
    expiresIn: AppConfig.ACCESS_TOKEN_EXPIRATION,
  })
}
