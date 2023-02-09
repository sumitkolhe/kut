import { $fetch } from 'ofetch'
import { storeToRefs } from 'pinia'
import { useAuthStore } from 'store/auth.store'
import { ErrorType } from 'interfaces/error.interface'
import type { $Fetch } from 'ofetch'

export class ApiService {
  public http: $Fetch

  constructor(baseURL: string) {
    this.http = $fetch.create({
      baseURL: `${baseURL}/api/v1`,

      async onResponseError({ response }) {
        if (
          response?.status === 401 &&
          response?._data?.message === ErrorType.invalidAuthenticationToken
        ) {
          const { refreshAccessToken } = useAuthStore()
          const { refreshToken } = storeToRefs(useAuthStore())

          await refreshAccessToken(refreshToken.value)
        } else if (response.status === 401) {
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
