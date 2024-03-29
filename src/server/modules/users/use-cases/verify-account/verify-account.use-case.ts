import { UserRepository } from 'server/modules/users/repositories'
import { HttpExceptionError } from 'server/common/exceptions'
import { ErrorType } from 'interfaces/error.interface'
import { verifyAccountVerificationToken } from 'server/modules/users/utils'
import type { IUseCase } from 'server/common/types'
import type { VerificationTokenDto } from 'server/modules/users/dto'

export class VerifyAccountUseCase implements IUseCase<VerificationTokenDto> {
  private userRepository: UserRepository

  constructor() {
    this.userRepository = new UserRepository()
  }

  async execute({ verificationToken }: VerificationTokenDto) {
    let decodedToken

    try {
      decodedToken = await verifyAccountVerificationToken(verificationToken)
    } catch {
      throw new HttpExceptionError(400, ErrorType.invalidVerifyToken)
    }

    const user = await this.userRepository.existsById(decodedToken.id)

    if (!user) throw new HttpExceptionError(404, ErrorType.userNotFound)

    return this.userRepository.updateVerificationById(decodedToken.id, true)
  }
}
