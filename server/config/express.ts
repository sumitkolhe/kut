import { config } from 'dotenv-safe'
import { isDev } from '@server/utils/isDev'

config({ allowEmptyValues: true })

export const expressConfig = {
  serverProtocol: isDev() ? 'http' : 'https',
  serverHost: 'localhost',
  serverPort: isDev() ? 3000 : Number(process.env.PORT) || 80,
}
