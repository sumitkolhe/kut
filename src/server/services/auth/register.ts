import { genSalt, hash } from 'bcryptjs'
import { CreateError } from '../../middleware/errorHandler'
import { UserModel } from '../../models/user.model'
import { Logger } from '../../utils/logger'

export const addUserToDatabase = async (email: string, submittedPassword: string): Promise<void> => {
  try {
    const salt = await genSalt(10)
    const password = await hash(submittedPassword, salt)
    const newUser = new UserModel({ email, password })
    await newUser.save()
  } catch (error) {
    Logger.error(`when adding new user ${email} : ${error}`)
    throw CreateError.InternalServerError
  }
}
