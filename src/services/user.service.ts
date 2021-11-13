import { UserDocument, UserModel } from 'src/models/user.model'
import { CreateError } from 'src/middleware/errorHandler'

export class UserService {
  static userInfo = async (email: string): Promise<UserDocument | null> => {
    const userDetails = await UserModel.findOne({ email })

    if (!userDetails) throw CreateError.NotFound('User does not exists')
    return userDetails
  }
}
