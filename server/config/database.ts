import { config } from 'dotenv-safe'

config({ allowEmptyValues: true })

export const databaseConfig = {
  databaseName: process.env.DATABASE_NAME ? process.env.DATABASE_NAME : 'trym_dev',
  mongoUrl: process.env.MONGO_URL ? process.env.MONGO_URL : 'mongodb://localhost:27017',
}
