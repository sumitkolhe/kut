import { config } from 'dotenv-safe'
import { isDev } from '@server/utils/isDev'

config({ allowEmptyValues: true })

export const expressConfig = {
  SERVER_HOST: 'localhost',
  SERVER_PORT: isDev() ? 3000 : Number(process.env.PORT) || 80,
}
