export interface Config {
  env: string
  database: {
    dbName: string
    dbUrl: string
  }
  cors: {
    origin: string | boolean
    credentials: boolean
  }
  log: {
    format: 'combined' | 'common' | 'dev' | 'short' | 'tiny'
    level: 'error' | 'warn' | 'info' | 'http' | 'debug'
  }
  accessToken: {
    secret: string
    expiresIn: string
  }
  refreshToken: {
    secret: string
    expiresIn: string
  }
  email: {
    apiKey: string
    senderName: string
    senderEmail: string
  }
}
