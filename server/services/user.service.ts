import { UserDocument, UserModel } from '@server/models/user.model'
import { CreateError } from '@server/middleware/errorHandler'

export class UserService {
  static userInfo = async (email: string): Promise<UserDocument | null> => {
    const userDetails = await UserModel.findOne({ email })

    if (!userDetails) throw CreateError.NotFound('User does not exists')
    return userDetails
  }
}
