import { $fetch } from 'ohmyfetch'
import type { $Fetch } from 'ohmyfetch'

export class ApiService {
  private baseUrl = '/api/v1'
  protected http: $Fetch

  constructor() {
    this.http = $fetch.create({
      baseURL: this.baseUrl,
      // credentials: 'include',

      async onRequest({ options }) {
        options.headers = {
          authorization: `${localStorage.getItem('auth._token.local')}`,
        }
      },

      async onResponseError({ response }) {
        if (response.status === 401 && response._data.message === 'jwt expired') {
          // const { $auth } = useNuxtApp()
          // await $auth.refreshToken()
        } else if (response.status >= 400) {
          // createToast(response?._data.message, { type: 'error' })
        }
      },
    })
  }
}
