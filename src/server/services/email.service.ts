import { logger } from 'server/utils/logger'
import { useConfig } from 'server/configs'
import { signAccountVerificationToken } from 'server/helpers/token.helper'
import { $fetch } from 'ohmyfetch'
import type { Config } from 'interfaces/config.interface'

export class EmailService {
  public emailConfig: Config['email']

  constructor() {
    this.emailConfig = useConfig().email
  }

  public sendVerificationEmail = async (email: string, name: string): Promise<void> => {
    const emailVerificationToken = await signAccountVerificationToken({ email })

    await $fetch('https://api.sendinblue.com/v3/smtp/email', {
      retry: 2,
      headers: {
        Accept: 'application/json',
        'api-key': this.emailConfig.apiKey,
        'content-type': 'application/json',
      },

      body: {
        templateId: 2,
        sender: {
          name: this.emailConfig.senderName,
          email: this.emailConfig.senderEmail,
        },
        to: [{ email, name }],
        params: {
          VERIFICATION_LINK: `https://kut.sh/api/auth/verify?token=${emailVerificationToken}`,
        },
      },
      method: 'POST',
    }).catch((error) => {
      logger.error('error sending verification email', error)
    })
  }
}
