import { UserRepository } from 'server/modules/users/repositories/user.repository'
import { HttpExceptionError } from 'server/common/exceptions/http.exception'
import { ErrorType } from 'interfaces/error.interface'
import { AccountVerificationEmailUseCase } from 'server/modules/users/use-cases/send-verification-email/send-verification-email.use-case'
import type { IUseCase } from 'server/common/types/use-case.type'
import type { Token } from 'interfaces/token.interface'

export class ResendAccountVerificationEmailUseCase implements IUseCase<String, Token> {
  private userRepository: UserRepository
  private accountVerificationEmailUseCase: AccountVerificationEmailUseCase

  constructor() {
    this.accountVerificationEmailUseCase = new AccountVerificationEmailUseCase()
    this.userRepository = new UserRepository()
  }

  async execute(email: string) {
    const userDetails = await this.userRepository.findByEmail(email)

    if (!userDetails) throw new HttpExceptionError(404, ErrorType.userNotFound)

    return this.accountVerificationEmailUseCase.execute(email)
  }
}
