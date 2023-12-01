import { $fetch } from 'ofetch'
import { useConfig } from 'server/common/configs'

interface SendEmailArgs {
  templateId: number
  toEmail: string
  params: Record<string, string>
}

export class EmailService {
  public sendEmail = async ({ templateId, toEmail, params }: SendEmailArgs) => {
    const {
      email: { apiKey, senderEmail, senderName },
    } = useConfig()

    return $fetch('https://api.brevo.com/v3/smtp/email', {
      retry: 2,
      headers: {
        Accept: 'application/json',
        'api-key': apiKey,
        'content-type': 'application/json',
      },
      body: {
        templateId,
        sender: {
          name: senderName,
          email: senderEmail,
        },
        to: [{ email: toEmail }],
        params: { ...params },
      },
      method: 'POST',
    })
  }
}
