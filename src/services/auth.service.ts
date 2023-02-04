import { ApiService } from 'services/api.service'
import type { User } from 'interfaces/user.interface'
import type { CustomResponse } from 'interfaces/response.interface'
import type { Token, Tokens } from 'interfaces/token.interface'

export class AuthService extends ApiService {
  private base: string

  constructor() {
    super()
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
    return this.http<CustomResponse<User>>(`${this.base}/me`, {
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
}
