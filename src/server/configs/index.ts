import { devConfig } from 'configs/dev.config'
import { productionConfig } from 'configs/production.config'

export const getConfig = () => {
  if (process.env.NODE_ENV === 'production') return productionConfig
  return devConfig
}
