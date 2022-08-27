import type { Config } from 'interfaces/config.interface'

export const devConfig: Config = {
  env: 'development',
  database: {
    dbName: 'local_dev',
    dbUrl: 'mongodb://localhost:27017',
  },
  cors: {
    origin: true,
    credentials: true,
  },
  log: {
    format: 'dev',
    level: 'debug',
  },
}
