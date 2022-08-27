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

    logger.info('connected using new db connection')
    const connection = await mongoose.connect(config.database.dbUrl, {
      keepAlive: true,
    })

    isConnected = connection.connections[0].readyState

    return isConnected
  } catch (error) {
    console.error('database connection failed.', error)
  }
}
