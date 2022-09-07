import { UserModel } from 'models/user.model'
import bcrypt from 'bcryptjs'
import { HttpExceptionError } from 'exceptions/http.exception'
import { signAccessToken } from 'helpers/token.helper'
import type { User } from 'interfaces/user.interface'

export class AuthService {
  public register = async (user: Pick<User, 'email' | 'password' | 'firstName' | 'lastName'>): Promise<void> => {
    const ifUserExist = await UserModel.findOne({ email: user.email })

    if (ifUserExist) throw new HttpExceptionError(409, 'email address is already registered')

    const salt = await bcrypt.genSalt(10)

    const hashedPassword = await bcrypt.hash(user.password, salt)

    const newUser = new UserModel({
      email: user.email,
      password: hashedPassword,
      firstName: user.firstName,
      lastName: user.lastName,
    })

    await newUser.save().catch(() => {
      throw new HttpExceptionError(500, 'something went wrong')
    })
  }

  public login = async (user: Pick<User, 'email' | 'password'>): Promise<string> => {
    const foundUser = await UserModel.findOne({ email: user.email })

    if (!foundUser) throw new HttpExceptionError(404, 'user not found')

    const comparePassword = await bcrypt.compare(user.password, foundUser.password.toString())

    if (!comparePassword) throw new HttpExceptionError(400, 'incorrect login credentials')

    const signedAccessToken = await signAccessToken({ email: user.email })

    return signedAccessToken
  }

  public me = async (email: string): Promise<User> => {
    const userDetails = await UserModel.findOne(
      { email },
      { _id: false, __v: false, userLinks: false, apiKey: false, password: false }
    )

    if (!userDetails) throw new HttpExceptionError(404, 'user not found')

    return userDetails.toObject<User>()
  }
}
