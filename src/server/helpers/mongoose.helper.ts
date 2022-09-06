import mongoose from 'mongoose'
import { logger } from 'utils/logger'
import { getConfig } from 'configs'

const config = getConfig()

let isConnected: mongoose.ConnectionStates

export default async () => {
  try {
    if (isConnected) {
      logger.info('connected using cached db')
      return Promise.resolve()
    }

    const connection = await mongoose.connect(config.database.dbUrl, {
      keepAlive: true,
      dbName: config.database.dbName,
    })

    isConnected = connection.connections[0].readyState

    logger.info('connected using new db connection')

    return isConnected
  } catch (error) {
    console.error('database connection failed.', error)
  }
}
