import { logger } from 'server/common/utils/logger'
import { useConfig } from 'server/common/configs'
import Papr from 'papr'
import { MongoClient } from 'mongodb'

const config = useConfig()

let cachedClient: MongoClient
let isConnected = false

export const papr = new Papr()

export default async () => {
  if (isConnected) {
    logger.info('connected using cached db')
    return cachedClient
  }

  try {
    cachedClient = await MongoClient.connect(config.database.dbUrl)

    const db = cachedClient.db(config.database.dbName)

    await db.collection('users').createIndex({ email: 1 }, { unique: true })
    await db.collection('links').createIndex({ alias: 1 }, { unique: true })
    await db.collection('links').createIndex(
      {
        alias: 'text',
        target: 'text',
        shortUrl: 'text',
        description: 'text',
      },
      {
        name: 'text_search_index',
      }
    )

    papr.initialize(db)
    await papr.updateSchemas()

    isConnected = true

    logger.info('connected using new db connection')
  } catch (error) {
    logger.error('error connecting to database', error)
  }
}
