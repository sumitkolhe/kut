import type { Config } from 'server/common/types/config.type'

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
    senderEmail: 'no-reply@kut.sh',
    senderName: 'Kut',
  },
  domain: {
    protocol: 'https',
    url: 'kut.sh',
  },
}
