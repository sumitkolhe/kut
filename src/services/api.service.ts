import { $fetch } from 'ohmyfetch'
import type { $Fetch } from 'ohmyfetch'
import { useAuthStore } from '~~/src/store/auth.store'

export class ApiService {
  private baseUrl = '/api/v1'
  protected http: $Fetch

  constructor() {
    this.http = $fetch.create({
      baseURL: this.baseUrl,

      async onResponseError({ response }) {
        if (response.status === 401) {
          const { logout } = useAuthStore()
          await logout()
          navigateTo('/auth/login')
        }
      },
    })
  }
}
