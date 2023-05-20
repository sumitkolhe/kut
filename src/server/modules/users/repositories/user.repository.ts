import { UserModel } from 'server/modules/users/models/user.model'
import { BaseRepository } from 'server/common/classes/base-repository.class'
import type { ObjectId } from 'mongodb'
import type { User } from 'server/modules/users/models/user.model'

export class UserRepository extends BaseRepository<User[0], User[1]> {
  constructor() {
    super(UserModel)
  }

  async findById(id: ObjectId) {
    return this.model.findById(id)
  }

  async createUser(email: string, password: string) {
    return this.model.insertOne({ email, password })
  }

  updateVerificationById(id: ObjectId, isVerified: boolean) {
    return this.model.findOneAndUpdate({ _id: id }, { $set: { isVerified } })
  }
}

export const userRepository = new UserRepository()
