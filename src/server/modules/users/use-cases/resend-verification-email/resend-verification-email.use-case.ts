import { UserRepository } from 'server/modules/users/repositories'
import { HttpExceptionError } from 'server/common/exceptions'
import { ErrorType } from 'interfaces/error.interface'
import { AccountVerificationEmailUseCase } from 'server/modules/users/use-cases'
import type { IUseCase } from 'server/common/types'

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
