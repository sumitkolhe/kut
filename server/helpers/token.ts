import { sign } from 'jsonwebtoken'
import { globalConfig } from '@server/config/global'

export const signAccessToken = (email: string): string =>
  sign({ email }, globalConfig.accessTokenSecret, {
    expiresIn: globalConfig.accessTokenExpiration,
    audience: globalConfig.websiteDomain,
  })

export const signRefreshToken = (email: string): string =>
  sign({ email }, globalConfig.refreshTokenSecret, {
    expiresIn: globalConfig.refreshTokenExpiration,
    audience: globalConfig.websiteDomain,
  })

export const signEmailVerificationToken = (email: string): string =>
  sign({ email }, globalConfig.emailVerificationTokenSecret, {
    expiresIn: globalConfig.emailVerificationTokenExpiration,
    audience: globalConfig.websiteDomain,
  })
