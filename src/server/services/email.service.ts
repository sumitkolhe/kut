import {
  SendSmtpEmail,
  TransactionalEmailsApi,
  TransactionalEmailsApiApiKeys,
} from '@sendinblue/client'
import { logger } from 'server/utils/logger'
import { useConfig } from 'server/configs'
import { signAccountVerificationToken } from 'server/helpers/token.helper'
import type { Config } from 'interfaces/config.interface'

export class EmailService {
  public emailClient: SendSmtpEmail
  public apiInstance: TransactionalEmailsApi
  public emailConfig: Config['email']

  constructor() {
    this.emailConfig = useConfig().email
    this.emailClient = new SendSmtpEmail()
    this.apiInstance = new TransactionalEmailsApi()
    this.apiInstance.setApiKey(TransactionalEmailsApiApiKeys.apiKey, this.emailConfig.apiKey)
  }

  public sendVerificationEmail = async (email: string, name: string): Promise<void> => {
    const emailVerificationToken = await signAccountVerificationToken({ email })

    this.emailClient.templateId = 2
    this.emailClient.sender = {
      name: this.emailConfig.senderName,
      email: this.emailConfig.senderEmail,
    }
    this.emailClient.to = [{ email, name }]
    this.emailClient.params = {
      VERIFICATION_LINK: `https://trym.in/api/auth/verify?token=${emailVerificationToken}`,
    }

    await this.apiInstance.sendTransacEmail(this.emailClient).catch((error) => {
      logger.error('error sending verification email', error)
    })
  }
}
