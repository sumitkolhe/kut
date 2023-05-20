import { EmailService } from 'server/modules/email/services/email.service'
import { EmailTemplate } from 'server/modules/email/types/email-templates.type'
import { useConfig } from 'server/common/configs'
import { signAccountVerificationToken } from 'server/modules/users/utils/token.util'
import type { IUseCase } from 'server/common/types/use-case.type'
import type { Token } from 'interfaces/token.interface'
import type { Config } from 'server/common/types/config.type'

export class AccountVerificationEmailUseCase implements IUseCase<String, Token> {
  private emailService: EmailService
  private domainConfig: Config['domain']

  constructor() {
    this.emailService = new EmailService()
    this.domainConfig = useConfig().domain
  }

  async execute(email: string) {
    const emailVerificationToken = await signAccountVerificationToken({ email })

    const verificationLink = `${this.domainConfig.protocol}://${this.domainConfig.url}/auth/verify-email?token=${emailVerificationToken}`

    return this.emailService.sendEmail({
      templateId: EmailTemplate.accountVerification,
      toEmail: email,
      params: {
        VERIFICATION_LINK: verificationLink,
      },
    })
  }
}
