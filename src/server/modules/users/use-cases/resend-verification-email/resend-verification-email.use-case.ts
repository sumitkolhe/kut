import { UserRepository } from 'server/modules/users/repositories/user.repository'
import { HttpExceptionError } from 'server/common/exceptions/http.exception'
import { ErrorType } from 'interfaces/error.interface'
import { AccountVerificationEmailUseCase } from 'server/modules/users/use-cases/send-verification-email/send-verification-email.use-case'
import type { IUseCase } from 'server/common/types/use-case.type'

export class ResendAccountVerificationEmailUseCase implements IUseCase<String> {
  private userRepository: UserRepository
  private accountVerificationEmailUseCase: AccountVerificationEmailUseCase

  constructor() {
    this.accountVerificationEmailUseCase = new AccountVerificationEmailUseCase()
    this.userRepository = new UserRepository()
  }

  async execute(userId: string) {
    const userDetails = await this.userRepository.getById(userId)

    if (!userDetails) throw new HttpExceptionError(404, ErrorType.userNotFound)

    return this.accountVerificationEmailUseCase.execute(userDetails.email)
  }
}
