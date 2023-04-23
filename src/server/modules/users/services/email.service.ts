import { $fetch } from 'ofetch'
import { useConfig } from 'server/common/configs'
import { signAccountVerificationToken } from 'server/modules/users/utils/token.util'
import type { Config } from 'interfaces/config.interface'

export class EmailService {
  public emailConfig: Config['email']
  public domainConfig: Config['domain']

  constructor() {
    this.emailConfig = useConfig().email
    this.domainConfig = useConfig().domain
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
          VERIFICATION_LINK: `${this.domainConfig.protocol}://${this.domainConfig.url}/auth/verify-email?token=${emailVerificationToken}`,
        },
      },
      method: 'POST',
    })
  }
}
