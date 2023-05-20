import { UserModel } from 'server/modules/users/models/user.model'
import { BaseRepository } from 'server/common/classes/base-repository.class'
import type { ObjectId } from 'mongodb'
import type { UserDto, UserDtoWithDefaults } from 'server/modules/users/dto/user.dto'

export class UserRepository extends BaseRepository<UserDto, UserDtoWithDefaults> {
  constructor() {
    super(UserModel)
  }

  async findById(id: ObjectId) {
    return this.model.findById(id)
  }

  async findByEmail(email: string) {
    return this.model.findOne({ email })
  }

  async exists(email: string) {
    return this.model.exists({ email })
  }

  async createUser(email: string, password: string) {
    return this.model.insertOne({ email, password })
  }

  updateVerificationById(id: ObjectId, isVerified: boolean) {
    return this.model.findOneAndUpdate({ _id: id }, { $set: { isVerified } })
  }
}

export const userRepository = new UserRepository()
