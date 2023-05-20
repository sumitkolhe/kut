import type { User } from 'server/modules/users/models/user.model'
import type { CustomResponse } from 'server/common/types/response.interface'
import type { Token, Tokens } from 'interfaces/token.interface'
import type { $Fetch } from 'ofetch'

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
    return this.http<CustomResponse<Tokens>>(`${this.base}/register`, {
      body: { email, password },
      method: 'POST',
    })
  }

  public async login(email: string, password: string) {
    return this.http<CustomResponse<Tokens>>(`${this.base}/login`, {
      body: { email, password },
      method: 'POST',
    })
  }

  public async fetchUser() {
    return this.http<CustomResponse<User[0]>>(`${this.base}/me`, {
      method: 'GET',
    })
  }

  public async refreshAccessToken(refreshToken: string) {
    return this.http<CustomResponse<Token>>(`${this.base}/refresh-token`, {
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
