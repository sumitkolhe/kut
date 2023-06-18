import { HttpExceptionError } from 'server/common/exceptions'
import { UserRepository } from 'server/modules/users/repositories'
import { ErrorType } from 'interfaces/error.interface'
import { signAccessToken, verifyRefreshToken } from 'server/modules/users/utils'
import type { IUseCase } from 'server/common/types/use-case.type'
import type { AccessTokenDto, RefreshTokenDto } from 'server/modules/users/dto'

export class RefreshTokenUseCase implements IUseCase<RefreshTokenDto, AccessTokenDto> {
  private userRepository: UserRepository

  constructor() {
    this.userRepository = new UserRepository()
  }

  async execute({ refreshToken }: RefreshTokenDto) {
    const decodedToken = await verifyRefreshToken(refreshToken).catch(() => {
      throw new HttpExceptionError(400, ErrorType.invalidRefreshToken)
    })

    const doesUserExist = await this.userRepository.existsById(decodedToken.id)

    if (!doesUserExist) throw new HttpExceptionError(404, ErrorType.userNotFound)

    const signedAccessToken = await signAccessToken({
      email: decodedToken.email,
    })

    return { accessToken: signedAccessToken }
  }
}
