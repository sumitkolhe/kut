import { randomUUID } from 'crypto'
import { UserRepository } from 'server/modules/users/repositories'
import { HttpExceptionError } from 'server/common/exceptions'
import { ErrorType } from 'interfaces/error.interface'
import {
  getGithubAccessToken,
  getGithubUser,
  getGithubUserEmails,
} from 'server/modules/users/helpers'
import { signAccessToken, signRefreshToken } from 'server/modules/users/utils'
import type { IUseCase } from 'server/common/types/use-case.type'
import type { AuthTokenDto, UserGithubLoginDto } from 'server/modules/users/dto'

export class LoginWithGithubUseCase implements IUseCase<UserGithubLoginDto, AuthTokenDto> {
  private userRepository: UserRepository

  constructor() {
    this.userRepository = new UserRepository()
  }

  async execute({ code }: UserGithubLoginDto) {
    const authResponse = await getGithubAccessToken(code)

    if (!authResponse.access_token) throw new HttpExceptionError(500, ErrorType.somethingWentWrong)

    const [user, emails] = await Promise.all([
      getGithubUser(authResponse.access_token),
      getGithubUserEmails(authResponse.access_token),
    ])

    // const githubAvatar = user.avatar_url
    const githubEmail = emails.find((email) => email.primary)?.email
    // const githubName = user.name

    if (!githubEmail) {
      logger.error(`Github email not found for user ${user.id}:${user.name}`)
      throw new HttpExceptionError(500, ErrorType.somethingWentWrong)
    }

    // check if user exists in db with the primary email
    const existingUser = await this.userRepository.findByEmail(githubEmail)

    if (!existingUser) {
      const newUser = await this.userRepository.create({
        email: githubEmail,
        isVerified: true,
        authProviders: {
          github: true,
          google: false,
          credentials: false,
        },
        apiKeys: {
          key: randomUUID(),
          name: 'default-api-key',
        },
      })

      const signedAccessToken = await signAccessToken({ id: newUser._id })
      const signedRefreshToken = await signRefreshToken({ id: newUser._id })

      return { accessToken: signedAccessToken, refreshToken: signedRefreshToken }
    } else if (existingUser.authProviders?.github === false) {
      await this.userRepository.update(existingUser._id.toString(), {
        $set: {
          'authProviders.github': true,
          isVerified: true,
        },
      })

      const signedAccessToken = await signAccessToken({ id: existingUser?._id })
      const signedRefreshToken = await signRefreshToken({ id: existingUser?._id })

      return { accessToken: signedAccessToken, refreshToken: signedRefreshToken }
    } else {
      const signedAccessToken = await signAccessToken({ id: existingUser?._id })
      const signedRefreshToken = await signRefreshToken({ id: existingUser?._id })

      return { accessToken: signedAccessToken, refreshToken: signedRefreshToken }
    }
  }
}
