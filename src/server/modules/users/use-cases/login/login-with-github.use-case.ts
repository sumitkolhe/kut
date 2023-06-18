import { UserRepository } from 'server/modules/users/repositories'
import { HttpExceptionError } from 'server/common/exceptions/http.exception'
import { ErrorType } from 'interfaces/error.interface'
import {
  getGithubAccessToken,
  getGithubUser,
  getGithubUserEmails,
} from 'server/modules/users/helpers'
import { signAccessToken, signRefreshToken } from 'server/modules/users/utils/token.util'
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

    let existingUser

    // check if user exists in db with the primary email
    existingUser = await this.userRepository.findByEmail(githubEmail)

    if (existingUser) {
      if (existingUser.authProviders?.social?.github === false) {
        await this.userRepository.update(existingUser._id.toString(), {
          $set: {
            'authProviders.social.github': true,
            isVerified: true,
          },
        })
      }
    } else {
      existingUser = await this.userRepository.create({
        email: githubEmail,
        isVerified: true,
        authProviders: {
          social: {
            github: true,
            google: false,
          },
          credentials: false,
        },
      })
    }

    // @ts-expect-error
    const signedAccessToken = await signAccessToken({ id: existingUser._id })
    // @ts-expect-error
    const signedRefreshToken = await signRefreshToken({ id: existingUser._id })

    return { accessToken: signedAccessToken, refreshToken: signedRefreshToken }
  }
}
