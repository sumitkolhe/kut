import type { $Fetch } from 'ofetch'
import type { CustomResponse } from 'server/common/types/response.interface'

export class StatisticsService {
  private http: $Fetch
  private base: string

  constructor() {
    const {
      $apiService: { http },
    } = useNuxtApp()

    this.http = http
    this.base = '/stats'
  }

  public async linkViews(alias: string, period?: string) {
    return this.http<CustomResponse<Record<string, number>>>(`${this.base}/${alias}/visits`, {
      query: { period },
      method: 'GET',
    })
  }

  public async overview() {
    return this.http<CustomResponse<Record<string, number>>>(`${this.base}/overview`, {
      method: 'GET',
    })
  }
}
