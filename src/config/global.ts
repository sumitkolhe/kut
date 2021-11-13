import { config } from 'dotenv-safe'
import { isDev } from 'src/utils/isDev'
import { expressConfig } from 'src/config/express'

config({ allowEmptyValues: true })

export const globalConfig = {
  websiteDomain: isDev()
    ? `${expressConfig.serverProtocol}://${expressConfig.serverHost}:${expressConfig.serverPort}`
    : `${expressConfig.serverProtocol}://trym.in`,
  aliasLength: 4,
  allowRegistration: true,
  accessTokenSecret: 't4gQdVeCKqawXVOazIZ1',
  accessTokenExpiration: '1d',
  refreshTokenSecret: 'epighnpeignepihwengpoengawXVOazIZ1',
  refreshTokenExpiration: '1y',
  emailVerificationTokenSecret: 'epigh840toieghfiehwt0wsdljvns',
  emailVerificationTokenExpiration: '1d',
}
