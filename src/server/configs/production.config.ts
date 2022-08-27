import type { Config } from '../interfaces/config.interface'

const config = useRuntimeConfig()

export const productionConfig: Config = {
  env: 'production',
  database: {
    dbName: config.DB_NAME,
    dbUrl: config.DB_URL,
  },
  cors: {
    origin: 'my-domain.com',
    credentials: true,
  },
  log: {
    format: 'tiny',
    level: 'info',
  },
}
