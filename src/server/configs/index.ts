import { devConfig } from 'configs/dev.config'
import { productionConfig } from 'configs/production.config'

export const useConfig = () => {
  if (process.env.NODE_ENV === 'production') return productionConfig
  return devConfig
}
