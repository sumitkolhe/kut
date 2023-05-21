import { connect, set } from 'mongoose'
import { logger } from 'server/common/utils/logger'
import { useConfig } from 'server/common/configs'
import type { ConnectionStates } from 'mongoose'

const config = useConfig()

let isConnected: ConnectionStates

export default async () => {
  try {
    if (isConnected) {
      logger.info('connected using cached db')
      return Promise.resolve()
    }

    set('strictQuery', true)

    const connection = await connect(config.database.dbUrl, {
      dbName: config.database.dbName,
    })

    isConnected = connection.connections[0].readyState

    logger.info('connected using new db connection')

    return isConnected
  } catch (error) {
    logger.error('database connection failed.', error)
  }
}
