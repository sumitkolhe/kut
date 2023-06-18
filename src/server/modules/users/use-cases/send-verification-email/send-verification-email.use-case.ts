import { EmailService } from 'server/modules/email/services'
import { EmailTemplate } from 'server/modules/email/types'
import { useConfig } from 'server/common/configs'
import { signAccountVerificationToken } from 'server/modules/users/utils'
import type { Config, IUseCase } from 'server/common/types'
import type { VerificationTokenDto } from 'server/modules/users/dto'

export class AccountVerificationEmailUseCase implements IUseCase<String, VerificationTokenDto> {
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
