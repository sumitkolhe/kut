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
  token: {
    access: {
      secret: 'erpigepigerpipr34634643',
      expiresIn: '1d',
    },
    refresh: {
      secret: 'soeugh8350238230oighwiogh43803480',
      expiresIn: '7d',
    },
    accountVerification: {
      secret: 'ifnew9823rh9283hf208g3h2308gh203gh2038gh230',
      expiresIn: '7d',
    },
  },
  email: {
    apiKey: '',
    senderEmail: 'no-reply@trym.in',
    senderName: 'Trym',
  },
}
