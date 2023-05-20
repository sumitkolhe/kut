import { UserRepository } from 'server/modules/users/repositories/user.repository'
import { HttpExceptionError } from 'server/common/exceptions/http.exception'
import { ErrorType } from 'interfaces/error.interface'
import type { ObjectId, WithId } from 'mongodb'
import type { IUseCase } from 'server/common/types/use-case.type'
import type { User } from 'server/modules/users/models/user.model'

export class MeUseCase implements IUseCase<ObjectId, WithId<User[0]>> {
  private userRepository: UserRepository

  constructor() {
    this.userRepository = new UserRepository()
  }

  async execute(userId: ObjectId) {
    const user = await this.userRepository.findById(userId)

    if (!user) throw new HttpExceptionError(404, ErrorType.userNotFound)

    return user
  }
}
