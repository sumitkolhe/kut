import { Logger } from '../utils/logger'

export default defineNuxtPlugin(() => {
  const logger = new Logger()

  return { provide: { logger } }
})
