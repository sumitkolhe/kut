import { UserModel } from 'server/modules/auth/models/user.model'
import { BaseRepository } from 'server/common/classes/base-repository.class'
import type { UserDocument } from 'server/modules/auth/models/user.model'

export class UserRepository extends BaseRepository<UserDocument> {
  constructor() {
    super(UserModel)
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.model.findOne({ email }).exec()
  }
}

export const userRepository = new UserRepository()
