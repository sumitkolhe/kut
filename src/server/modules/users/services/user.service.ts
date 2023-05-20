import { MeUseCase } from 'server/modules/users/use-cases/me/me.use-case'
import type { ObjectId } from 'mongodb'

export class UserService {
  private readonly meUseCase: MeUseCase

  constructor() {
    this.meUseCase = new MeUseCase()
  }

  public me = async (userId: ObjectId) => {
    return this.meUseCase.execute(userId)
  }
}
