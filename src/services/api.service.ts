import { $fetch } from 'ohmyfetch'
import type { $Fetch } from 'ohmyfetch'

export class ApiService {
  private baseUrl = '/api/v1'
  protected http: $Fetch

  constructor() {
    this.http = $fetch.create({
      baseURL: this.baseUrl,
      async onRequest({ options }) {
        options.headers = {
          authorization: `${localStorage.getItem('auth._token.local')}`,
        }
      },
    })
  }
}
