import { HttpExceptionError } from 'server/common/exceptions/http.exception'
import { UserRepository } from 'server/modules/users/repositories/user.repository'
import { ErrorType } from 'interfaces/error.interface'
import bcrypt from 'bcryptjs'
import { signAccessToken, signRefreshToken } from 'server/modules/users/utils/token.util'
import type { IUseCase } from 'server/common/types/use-case.type'
import type { UserLoginDto } from 'server/modules/users/dto/login.dto'
import type { AuthTokenDto } from 'server/modules/users/dto/token.dto'

export class LoginUserUseCase implements IUseCase<UserLoginDto, AuthTokenDto> {
  private userRepository: UserRepository

  constructor() {
    this.userRepository = new UserRepository()
  }

  async execute({ email, password }: UserLoginDto) {
    const doesUserExist = await this.userRepository.findByEmail(email)

    if (!doesUserExist) throw new HttpExceptionError(404, ErrorType.userNotFound)

    const doesPasswordMatch = await bcrypt.compare(password, doesUserExist.password)

    if (!doesPasswordMatch) throw new HttpExceptionError(400, ErrorType.incorrectLoginCredentials)

    const signedAccessToken = await signAccessToken({ id: doesUserExist._id })
    const signedRefreshToken = await signRefreshToken({ id: doesUserExist._id })

    return { accessToken: signedAccessToken, refreshToken: signedRefreshToken }
  }
}
