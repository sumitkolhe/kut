import mongoose from 'mongoose'
import { Logger } from '../utils/logger'
import { databaseConfig } from '../config/database'

export const mongoOptions = {
  dbName: databaseConfig.DB_NAME,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
}

export const connectDatabase = async (): Promise<void> => {
  await mongoose
    .connect(databaseConfig.MONGO_URL, mongoOptions)
    .then(() => {
      Logger.info('Connected To Database')
    })
    .catch((err) => {
      Logger.error(err.message)
    })
}
