import { createTransport, Transporter } from 'nodemailer'
import mailgun from 'nodemailer-mailgun-transport'
import { mailgunConfig } from '@server/config/mailgun'
import { Email } from '@server/interfaces/email'

export const sendMail = async (emailPayload: Email): Promise<void> => {
  const auth = {
    auth: {
      api_key: mailgunConfig.apikey,
      domain: mailgunConfig.domain,
    },
  }

  const transporter: Transporter = createTransport(mailgun(auth))

  const mailOptions = {
    from: mailgunConfig.sender,
    to: emailPayload.recipient,
    subject: emailPayload.subject,
    template: emailPayload.template,
    'h:X-Mailgun-Variables': JSON.stringify({ verificationLink: emailPayload.link }),
  }

  await transporter.sendMail(mailOptions)
}
