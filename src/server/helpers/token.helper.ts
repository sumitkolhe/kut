import Jwt from 'jsonwebtoken'
import { useConfig } from 'configs'
import type { JwtPayload } from 'jsonwebtoken'

const config = useConfig()

export const signAccessToken = async (data: string | object | Buffer) => {
  return Jwt.sign(data, config.token.access.secret, {
    expiresIn: config.token.access.expiresIn,
  })
}

export const signRefreshToken = async (data: string | object | Buffer) => {
  return Jwt.sign(data, config.token.refresh.secret, {
    expiresIn: config.token.refresh.expiresIn,
  })
}

export const verifyRefreshToken = async (refreshToken: string): Promise<JwtPayload> => {
  return Jwt.verify(refreshToken, config.token.refresh.secret) as JwtPayload
}
