import mongoose from 'mongoose'
import { logger } from 'server/common/utils/logger'
import { useConfig } from 'server/common/configs'

const config = useConfig()

let isConnected: mongoose.ConnectionStates

export default async () => {
  try {
    if (isConnected) {
      logger.info('connected using cached db')
      return Promise.resolve()
    }

    mongoose.set('strictQuery', true)

    const connection = await mongoose.connect(config.database.dbUrl, {
      keepAlive: true,
      dbName: config.database.dbName,
    })

    isConnected = connection.connections[0].readyState

    logger.info('connected using new db connection')

    return isConnected
  } catch (error) {
    logger.error('database connection failed.', error)
  }
}
