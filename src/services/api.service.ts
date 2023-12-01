import { $fetch } from 'ofetch'
import { storeToRefs } from 'pinia'
import { useAuthStore } from 'store/auth.store'
import { ErrorType } from 'interfaces/error.interface'
import type { $Fetch } from 'ofetch'

const reasonsToRenewSession = [ErrorType.invalidAuthenticationToken, ErrorType.unauthorised]

const reasonsToLogout = [ErrorType.invalidRefreshToken, ErrorType.userNotFound]

export class ApiService {
  public http: $Fetch

  constructor(baseURL: string) {
    this.http = $fetch.create({
      baseURL: `${baseURL}/api/v1`,

      async onResponseError({ response }) {
        if (response?.status === 401 && reasonsToRenewSession.includes(response?._data?.message)) {
          const { refreshAccessToken } = useAuthStore()
          const { refreshToken } = storeToRefs(useAuthStore())

          await refreshAccessToken(refreshToken.value)
        } else if (response?.status === 401 && reasonsToLogout.includes(response?._data?.message)) {
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
