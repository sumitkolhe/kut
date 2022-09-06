import Jwt from 'jsonwebtoken'
import { getConfig } from 'configs'

const config = getConfig()

export const signAccessToken = async (data: string | object | Buffer) => {
  return Jwt.sign(data, config.accessToken.secret, {
    expiresIn: config.accessToken.expiresIn,
  })
}
