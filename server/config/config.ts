import * as dotenv from 'dotenv'
dotenv.config()

export const AppConfig = {
  APP_NAME: 'Reduced',
  APP_VERSION: '2.0.0',
  PORT: process.env.PORT
  ? process.env.PORT
  : '80',
  MONGO_URL: process.env.MONGO_URL
    ? process.env.MONGO_URL
    : 'mongodb://localhost:27017/dev',
  ALIAS_LENGTH: process.env.ALIAS_LENGTH || 4,
  DOMAIN: process.env.DOMAIN || 'reduced.me',
  ACCESS_TOKEN_SECRET: 't4gQdVeCKqawXVOazIZ1',
  ACCESS_TOKEN_EXPIRATION: '7d',
}
