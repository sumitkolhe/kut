import mongoose from 'mongoose'
import { logger } from 'utils/logger'
import { getConfig } from 'configs'

const config = getConfig()

let isConnected: mongoose.ConnectionStates

export default async () => {
  try {
    if (isConnected) {
      logger.info('=> using existing database connection')
      return Promise.resolve()
    }

    logger.info('=> using new database connection')
    return mongoose
      .connect(config.database.dbUrl, {
        bufferCommands: false,
      })
      .then((db) => {
        isConnected = db.connections[0].readyState
      })
  } catch (err) {
    console.error('DB connection failed.', err)
  }
}
