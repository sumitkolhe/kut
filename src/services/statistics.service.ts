import { ApiService } from 'services/api.service'
import type { CustomResponse } from 'interfaces/response.interface'

export class StatisticsService extends ApiService {
  private base: string

  constructor() {
    super()
    this.base = '/stats'
  }

  public async linkViews(alias: string) {
    return this.http<CustomResponse<Record<string, number>>>(`${this.base}/${alias}/visits`, {
      method: 'GET',
    })
  }
}
