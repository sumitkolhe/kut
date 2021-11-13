import { config } from 'dotenv-safe'

config({ allowEmptyValues: true })

export const mailgunConfig = {
  apikey: process.env.MAILGUN_API_KEY ? process.env.MAILGUN_API_KEY : '',
  domain: process.env.MAILGUN_DOMAIN ? process.env.MAILGUN_DOMAIN : '',
  sender: 'no-reply@mail.trym.in',
}
