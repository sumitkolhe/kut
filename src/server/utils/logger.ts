import { createLogger, transports as loggerTransport, format as loggerFormat } from 'winston'
import { isDev } from '@server/utils/isDev'

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
}

const level = () => {
  return isDev() ? 'debug' : 'warn'
}

const format = loggerFormat.combine(
  loggerFormat.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  loggerFormat.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
)

const transports = [new loggerTransport.Console()]

export const Logger = createLogger({
  level: level(),
  levels,
  format,
  transports,
})
