import { config } from 'dotenv-safe'
import { isDev } from 'src/utils/isDev'

config({ allowEmptyValues: true })

export const expressConfig = {
  serverProtocol: isDev() ? 'http' : 'https',
  serverHost: 'localhost',
  serverPort: isDev() ? 4000 : Number(process.env.PORT) || 80,
}
