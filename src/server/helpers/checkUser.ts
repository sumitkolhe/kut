import { userDetailsInterface } from '@server/interfaces/user'
import { UserModel } from '../models/user.model'

export const checkIfUserExists = async (email: string): Promise<userDetailsInterface> => {
  const userAlreadyExist = await UserModel.findOne({ email })
  return userAlreadyExist
}
