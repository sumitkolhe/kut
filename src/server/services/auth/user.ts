import { CreateError } from '@server/middleware/errorHandler'
import { UserModel } from '@server/models/user.model'
import { userDetailsInterface } from '@server/interfaces/user'

export const userInfo = async (email: string): Promise<userDetailsInterface> => {
  try {
    const userDetails = await UserModel.findOne({ email })
    if (!userDetails) throw CreateError.NotFound('User not found')

    return userDetails
  } catch (error) {
    throw CreateError.NotFound('User does not exists')
  }
}
