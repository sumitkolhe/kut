import { HttpExceptionError } from 'server/common/exceptions'
import { UserRepository } from 'server/modules/users/repositories'
import { ErrorType } from 'interfaces/error.interface'
import bcrypt from 'bcryptjs'
import { signAccessToken, signRefreshToken } from 'server/modules/users/utils'
import type { IUseCase } from 'server/common/types'
import type { AuthTokenDto, UserLoginDto } from 'server/modules/users/dto'

export class LoginUserUseCase implements IUseCase<UserLoginDto, AuthTokenDto> {
  private userRepository: UserRepository

  constructor() {
    this.userRepository = new UserRepository()
  }

  async execute({ email, password }: UserLoginDto) {
    const existingUser = await this.userRepository.findByEmail(email)

    if (!existingUser) throw new HttpExceptionError(404, ErrorType.userNotFound)

    if (!existingUser.password)
      throw new HttpExceptionError(400, ErrorType.incorrectLoginCredentials)

    const doesPasswordMatch = await bcrypt.compare(password!, existingUser.password)

    if (!doesPasswordMatch) throw new HttpExceptionError(400, ErrorType.incorrectLoginCredentials)

    const signedAccessToken = await signAccessToken({ id: existingUser._id })
    const signedRefreshToken = await signRefreshToken({ id: existingUser._id })

    return { accessToken: signedAccessToken, refreshToken: signedRefreshToken }
  }
}
