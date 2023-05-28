import { UserModel } from 'server/modules/users/models/user.model'
import { BaseRepository } from 'server/common/classes/base-repository.class'
import type { UserDto } from 'server/modules/users/dto/user.dto'

export class UserRepository extends BaseRepository<UserDto, UserDto> {
  constructor() {
    super(UserModel)
  }

  async findByEmail(email: string) {
    return this.model.findOne({ email }).select('email password authProviders').lean().exec()
  }

  updateVerificationById(id: string, isVerified: boolean) {
    return this.model.findOneAndUpdate({ _id: id }, { $set: { isVerified } }).lean().exec()
  }
}

export const userRepository = new UserRepository()
