import { config } from 'dotenv-safe'

config({ allowEmptyValues: true })

export const globalConfig = {
  WEBSITE_DOMAIN: 'trym.in',
  ALIAS_LENGTH: 4,
  ALLOW_REGISTRATION: true,

  // Auth Token vars
  ACCESS_TOKEN_SECRET: 't4gQdVeCKqawXVOazIZ1',
  ACCESS_TOKEN_EXPIRATION: '1d',
  REFRESH_TOKEN_SECRET: 'epighnpeignepihwengpoengawXVOazIZ1',
  REFRESH_TOKEN_EXPIRATION: '1y',
}
