import { HttpExceptionError } from 'server/common/exceptions/http.exception'
import { UserRepository } from 'server/modules/users/repositories/user.repository'
import { ErrorType } from 'interfaces/error.interface'
import bcrypt from 'bcryptjs'
import { signAccessToken, signRefreshToken } from 'server/modules/users/utils/token.util'
import type { User } from 'interfaces/user.interface'
import type { IUseCase } from 'server/common/types/use-case.type'
import type { Tokens } from 'interfaces/token.interface'

type LoginUserUseCaseParams = Pick<User, 'email' | 'password'>

export class LoginUserUseCase implements IUseCase<LoginUserUseCaseParams, Tokens> {
  private userRepository: UserRepository

  constructor() {
    this.userRepository = new UserRepository()
  }

  async execute({ email, password }: Pick<User, 'email' | 'password'>) {
    const doesUserExist = await this.userRepository.findByEmail(email)

    if (!doesUserExist) throw new HttpExceptionError(404, ErrorType.userNotFound)

    const doesPasswordMatch = await bcrypt.compare(password, doesUserExist.password.toString())

    if (!doesPasswordMatch) throw new HttpExceptionError(400, ErrorType.incorrectLoginCredentials)

    const signedAccessToken = await signAccessToken({ id: doesUserExist._id })
    const signedRefreshToken = await signRefreshToken({ id: doesUserExist._id })

    return { accessToken: signedAccessToken, refreshToken: signedRefreshToken }
  }
}
