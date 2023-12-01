import { devConfig } from '~/server/common/configs/dev.config'
import { productionConfig } from '~/server/common/configs/production.config'

export const useConfig = () => {
  if (process.env.NODE_ENV === 'production') return productionConfig

  return devConfig
}
