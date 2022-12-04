import { ApiService } from 'services/api.service'
import type { Auth } from '@nuxtjs-alt/auth/dist/runtime'
import type { CustomResponse } from 'interfaces/response.interface'
import type { Tokens } from 'interfaces/token.interface'

export class AuthService extends ApiService {
  private base: string
  private auth: Auth

  constructor() {
    super()
    this.base = '/auth'
    this.auth = useNuxtApp().$auth
  }

  public async register(email: string, password: string) {
    return this.http<CustomResponse<Tokens>>(`${this.base}/register`, {
      body: { email, password },
      method: 'POST',
    })
  }

  public async login(email: string, password: string) {
    return this.auth.loginWith('local', {
      body: { email, password },
    })
  }

  public async logout() {
    return this.auth.logout()
  }

  public async resendVerificationEmail() {
    return this.http<CustomResponse<null>>(`${this.base}/resend-verification-email`, {
      method: 'POST',
    })
  }
}
