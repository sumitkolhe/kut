import { HttpExceptionError } from 'server/common/exceptions/http.exception'
import { UserRepository } from 'server/modules/users/repositories/user.repository'
import { ErrorType } from 'interfaces/error.interface'
import { signAccessToken, verifyRefreshToken } from 'server/modules/users/utils/token.util'
import type { IUseCase } from 'server/common/types/use-case.type'
import type { AccessTokenDto } from 'server/modules/users/dto/token.dto'

export class RefreshTokenUseCase implements IUseCase<String, AccessTokenDto> {
  private userRepository: UserRepository

  constructor() {
    this.userRepository = new UserRepository()
  }

  async execute(refreshToken: string) {
    const decodedToken = await verifyRefreshToken(refreshToken).catch(() => {
      throw new HttpExceptionError(400, ErrorType.invalidRefreshToken)
    })

    const doesUserExist = await this.userRepository.findById(decodedToken.id)

    if (!doesUserExist) throw new HttpExceptionError(404, ErrorType.userNotFound)

    const signedAccessToken = await signAccessToken({
      email: decodedToken.email,
    })

    return { accessToken: signedAccessToken }
  }
}
