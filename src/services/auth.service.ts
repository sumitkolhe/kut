import { compare, genSalt, hash } from 'bcryptjs'
import { verify } from 'jsonwebtoken'
import { CurrentUser, User } from 'src/interfaces/user'
import { UserModel } from 'src/models/user.model'
import { sendMail } from 'src/helpers/mailer'
import { CreateError } from 'src/middleware/errorHandler'
import { signAccessToken, signEmailVerificationToken, signRefreshToken } from 'src/helpers/token'
import { Email } from 'src/interfaces/email'
import { globalConstants } from 'src/constants'
import { globalConfig } from 'src/config/global'

export class AuthService {
  static register = async (userRegistrationDetails: Pick<User, 'email' | 'name' | 'password'>): Promise<void> => {
    // check if user already exists
    const userAlreadyExist = await UserModel.findOne({ email: userRegistrationDetails.email })
    if (userAlreadyExist) throw CreateError.Conflict('Email is already registered')

    // hash password
    const salt = await genSalt(10)
    const password = await hash(userRegistrationDetails.password, salt)

    // save user to database
    const newUser = new UserModel({
      name: userRegistrationDetails.name,
      email: userRegistrationDetails.email,
      password,
    })
    await newUser.save()

    // generate email verification token
    const verificationToken = signEmailVerificationToken(userRegistrationDetails.email)

    // generate email payload and send verification email
    const emailPayload: Email = {
      recipient: userRegistrationDetails.email,
      subject: 'Verify your account',
      template: globalConstants.emailTemplates.verification,
      link: `${globalConfig.websiteDomain}/api/auth/verify/${verificationToken}`,
    }

    await sendMail(emailPayload)
  }

  static login = async (
    userLoginDetails: Pick<User, 'email' | 'password'>
  ): Promise<{ accessToken: string; refreshToken: string }> => {
    const userAlreadyExist = await UserModel.findOne({ email: userLoginDetails.email })

    // checks
    if (!userAlreadyExist) throw CreateError.Conflict('User does not exists')
    if (userAlreadyExist.isBanned) throw CreateError.Unauthorized('User is banned')
    if (!userAlreadyExist.isVerified) throw CreateError.Unauthorized('Email is not verified')

    const passwordMatch = await compare(userLoginDetails.password, userAlreadyExist.password)

    if (!passwordMatch) throw CreateError.BadRequest('Incorrect login credentials')

    const signedAccessToken = signAccessToken(userLoginDetails.email)
    const signedRefreshToken = signRefreshToken(userLoginDetails.email)

    return {
      accessToken: signedAccessToken,
      refreshToken: signedRefreshToken,
    }
  }

  static verifyUser = async (token: string): Promise<void> => {
    const isVerified = verify(token, globalConfig.emailVerificationTokenSecret) as CurrentUser

    if (!isVerified) throw CreateError.BadRequest('verification token invalid or expired')

    await UserModel.findOneAndUpdate({ email: isVerified.email }, { isVerified: true })
  }
}
