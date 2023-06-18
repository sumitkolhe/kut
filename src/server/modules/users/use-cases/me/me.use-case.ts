import { UserRepository } from 'server/modules/users/repositories'
import { HttpExceptionError } from 'server/common/exceptions'
import { ErrorType } from 'interfaces/error.interface'
import type { IUseCase } from 'server/common/types'
import type { UserDto } from 'server/modules/users/dto'

export class MeUseCase implements IUseCase<String, UserDto> {
  private userRepository: UserRepository

  constructor() {
    this.userRepository = new UserRepository()
  }

  async execute(userId: string) {
    const user = await this.userRepository.getById(userId)

    if (!user) throw new HttpExceptionError(404, ErrorType.userNotFound)

    return user
  }
}
