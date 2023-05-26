import { MeUseCase } from 'server/modules/users/use-cases/me/me.use-case'

export class UserService {
  private readonly meUseCase: MeUseCase

  constructor() {
    this.meUseCase = new MeUseCase()
  }

  public me = async (userId: string) => {
    return this.meUseCase.execute(userId)
  }
}
