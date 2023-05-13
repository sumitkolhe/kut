import { signAccountVerificationToken } from 'server/modules/users/utils/token.util'
import { sendEmail } from 'server/modules/email/helpers/email.helper'
import { EmailTemplate } from 'server/modules/email/types/email-templates.type'
import { useConfig } from 'server/common/configs'
import type { Config } from 'interfaces/config.interface'
import type { IUseCase } from 'server/common/types/use-case.type'
import type { Token } from 'interfaces/token.interface'

export class AccountVerificationEmailUseCase implements IUseCase<String, Token> {
  private domainConfig: Config['domain']

  constructor() {
    this.domainConfig = useConfig().domain
  }

  async execute(email: string) {
    const emailVerificationToken = await signAccountVerificationToken({ email })

    return sendEmail({
      templateId: EmailTemplate.accountVerification,
      toEmail: '',
      params: {
        VERIFICATION_LINK: `${this.domainConfig.protocol}://${this.domainConfig.url}/auth/verify-email?token=${emailVerificationToken}`,
      },
    })
  }
}
