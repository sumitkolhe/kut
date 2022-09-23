import type { Config } from 'interfaces/config.interface'

const config = useRuntimeConfig()

export const productionConfig: Config = {
  env: 'production',
  database: {
    dbName: config.dbName,
    dbUrl: config.dbUrl,
  },
  cors: {
    origin: true,
    credentials: true,
  },
  log: {
    format: 'tiny',
    level: 'info',
  },
  token: {
    access: {
      secret: config.accessTokenSecret,
      expiresIn: config.accessTokenExpiration,
    },
    refresh: {
      secret: config.refreshTokenSecret,
      expiresIn: config.refreshTokenExpiration,
    },
    accountVerification: {
      secret: config.accountVerificationTokenSecret,
      expiresIn: config.accountVerificationTokenExpiration,
    },
  },
  email: {
    apiKey: config.emailApiKey,
    senderEmail: 'no-reply@trym.in',
    senderName: 'Trym',
  },
  domain: {
    protocol: 'http',
    url: 'trym.in',
  },
}
