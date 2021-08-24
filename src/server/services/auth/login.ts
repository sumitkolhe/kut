import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { CreateError } from '../../middleware/errorHandler'
import { globalConfig } from '../../config/global'

const signAccessToken = (email: string) => {
  try {
    return sign({ email }, globalConfig.ACCESS_TOKEN_SECRET, {
      expiresIn: globalConfig.ACCESS_TOKEN_EXPIRATION,
    })
  } catch (error) {
    throw CreateError.InternalServerError
  }
}

const signRefreshToken = (email: string) => {
  try {
    return sign({ email }, globalConfig.REFRESH_TOKEN_SECRET, {
      expiresIn: globalConfig.REFRESH_TOKEN_EXPIRATION,
    })
  } catch (error) {
    throw CreateError.InternalServerError
  }
}

export const checkPassword = async (password: string, submittedPassword: string): Promise<boolean> => {
  const passwordMatch = await compare(password, submittedPassword)
  return passwordMatch
}

export const generateLoginToken = (email: string): { signedAccessToken: string; signedRefreshToken: string } => {
  const signedAccessToken = signAccessToken(email)
  const signedRefreshToken = signRefreshToken(email)

  return { signedAccessToken, signedRefreshToken }
}
