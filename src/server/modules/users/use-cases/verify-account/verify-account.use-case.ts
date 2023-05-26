import { UserRepository } from 'server/modules/users/repositories/user.repository'
import { HttpExceptionError } from 'server/common/exceptions/http.exception'
import { ErrorType } from 'interfaces/error.interface'
import { verifyAccountVerificationToken } from 'server/modules/users/utils/token.util'
import type { IUseCase } from 'server/common/types/use-case.type'

export class VerifyAccountUseCase implements IUseCase<String> {
  private userRepository: UserRepository

  constructor() {
    this.userRepository = new UserRepository()
  }

  async execute(verificationToken: string) {
    let decodedToken

    try {
      decodedToken = await verifyAccountVerificationToken(verificationToken)
    } catch {
      throw new HttpExceptionError(400, ErrorType.invalidVerifyToken)
    }

    const user = await this.userRepository.existsById(decodedToken.id)

    if (!user) throw new HttpExceptionError(404, ErrorType.userNotFound)

    await this.userRepository.updateVerificationById(decodedToken.id, true)
  }
}
