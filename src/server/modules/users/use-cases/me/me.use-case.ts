import { UserRepository } from 'server/modules/users/repositories/user.repository'
import { HttpExceptionError } from 'server/common/exceptions/http.exception'
import { ErrorType } from 'interfaces/error.interface'
import type { IUseCase } from 'server/common/types/use-case.type'
import type { UserDto } from 'server/modules/users/dto/user.dto'

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
