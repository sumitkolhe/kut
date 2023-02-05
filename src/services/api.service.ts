import { $fetch } from 'ofetch'
import { storeToRefs } from 'pinia'
import { useAuthStore } from 'store/auth.store'
import type { $Fetch } from 'ofetch'

export class ApiService {
  private baseUrl = '/api/v1'
  protected http: $Fetch

  constructor() {
    this.http = $fetch.create({
      baseURL: this.baseUrl,

      async onResponseError({ response }) {
        if (response.status === 401) {
          const { logout } = useAuthStore()
          return logout()
        }
      },

      onRequest({ options }) {
        const { accessToken } = storeToRefs(useAuthStore())

        options.headers = new Headers(options.headers)
        options.headers.set('Authorization', `Bearer ${accessToken.value}`)
      },
    })
  }
}
