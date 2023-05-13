import { AccountVerificationEmailUseCase } from 'server/modules/email/use-cases/account-verification/account-verification-email.use-case'

export class EmailService {
  private accountVerificationEmailUsecase: AccountVerificationEmailUseCase

  constructor() {
    this.accountVerificationEmailUsecase = new AccountVerificationEmailUseCase()
  }

  public sendAccountVerificationEmail = async (email: string): Promise<void> => {
    return this.accountVerificationEmailUsecase.execute(email)
  }
}
