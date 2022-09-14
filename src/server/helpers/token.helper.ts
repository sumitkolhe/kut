import Jwt from 'jsonwebtoken'
import { useConfig } from 'configs'
import type { JwtPayload } from 'jsonwebtoken'

const config = useConfig()

export const signAccessToken = async (data: string | object | Buffer) => {
  return Jwt.sign(data, config.accessToken.secret, {
    expiresIn: config.accessToken.expiresIn,
  })
}

export const signRefreshToken = async (data: string | object | Buffer) => {
  return Jwt.sign(data, config.refreshToken.secret, {
    expiresIn: config.refreshToken.expiresIn,
  })
}

export const verifyRefreshToken = async (refreshToken: string): Promise<JwtPayload> => {
  return Jwt.verify(refreshToken, config.refreshToken.secret) as JwtPayload
}
