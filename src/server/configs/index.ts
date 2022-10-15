import { devConfig } from 'server/configs/dev.config'
import { productionConfig } from 'server/configs/production.config'

export const useConfig = () => {
  if (process.env.NODE_ENV === 'production') return productionConfig
  return devConfig
}
