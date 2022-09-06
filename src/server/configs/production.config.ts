import type { Config } from 'interfaces/config.interface'

const config = useRuntimeConfig()

export const productionConfig: Config = {
  env: 'production',
  database: {
    dbName: config.dbName,
    dbUrl: config.dbUrl,
  },
  cors: {
    origin: 'trym.in',
    credentials: true,
  },
  log: {
    format: 'tiny',
    level: 'info',
  },
  accessToken: {
    secret: config.accessTokenSecret,
    expiresIn: config.accessTokenExpiration,
  },
}
