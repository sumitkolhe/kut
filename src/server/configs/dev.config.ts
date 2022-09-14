import type { Config } from 'interfaces/config.interface'

export const devConfig: Config = {
  env: 'development',
  database: {
    dbName: 'trym-db-dev',
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
  accessToken: {
    secret: 'erpigepigerpipr34634643',
    expiresIn: '1d',
  },
  refreshToken: {
    secret: 'soeugh8350238230oighwiogh43803480',
    expiresIn: '7d',
  },
  emailApiKey: '',
}
