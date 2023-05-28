import type { CustomResponse } from 'server/common/types/response.interface'
import type { $Fetch } from 'ofetch'
import type { UserRegisterDto } from 'server/modules/users/dto/register.dto'
import type { AccessTokenDto, AuthTokenDto } from 'server/modules/users/dto/token.dto'
import type { UserDto } from 'server/modules/users/dto/user.dto'

export class AuthService {
  private http: $Fetch
  private base: string

  constructor() {
    const {
      $apiService: { http },
    } = useNuxtApp()

    this.http = http
    this.base = '/auth'
  }

  public async register(email: string, password: string) {
    return this.http<CustomResponse<UserRegisterDto>>(`${this.base}/register`, {
      body: { email, password },
      method: 'POST',
    })
  }

  public async login(email: string, password: string) {
    return this.http<CustomResponse<AuthTokenDto>>(`${this.base}/login`, {
      body: { email, password },
      method: 'POST',
    })
  }

  public async loginWithGithub(code: string) {
    return this.http<CustomResponse<AuthTokenDto>>(`${this.base}/github`, {
      body: { code },
      method: 'POST',
    })
  }

  public async fetchUser() {
    return this.http<CustomResponse<UserDto>>(`user/me`, {
      method: 'GET',
    })
  }

  public async refreshAccessToken(refreshToken: string) {
    return this.http<CustomResponse<AccessTokenDto>>(`${this.base}/refresh-token`, {
      method: 'POST',
      body: { refreshToken },
    })
  }

  public async resendVerificationEmail() {
    return this.http<CustomResponse<null>>(`${this.base}/resend-verification-email`, {
      method: 'POST',
    })
  }

  public async verifyEmail(token: string) {
    return this.http<CustomResponse<null>>(`${this.base}/verify-email`, {
      method: 'POST',
      query: { token },
    })
  }
}
