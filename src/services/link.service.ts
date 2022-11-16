import { ApiService } from 'services/api.service'
import type { Link } from 'interfaces/link.interface'
import type { CustomResponse } from 'interfaces/response.interface'

export class LinkService extends ApiService {
  private base: string

  constructor() {
    super()
    this.base = '/link'
  }

  public async shorten(linkPayload: Pick<Link, 'alias' | 'target' | 'meta' | 'description'>) {
    return this.http<CustomResponse<Pick<Link, 'alias' | 'target' | 'meta' | 'description'>>>(
      `${this.base}/shorten`,
      {
        body: linkPayload,
        method: 'POST',
      }
    )
  }

  public async fetchLinks(offset = 0, limit = 5) {
    return this.http<CustomResponse<{ links: Link[]; total: number }>>(`${this.base}`, {
      query: { limit, offset },
      method: 'GET',
    })
  }

  public async updateLink() {
    return this.http<CustomResponse<Link>>(`${this.base}/shorten`, {
      body: {},
      method: 'POST',
    })
  }

  public async deleteLink(email: string, password: string) {
    return this.http<CustomResponse<Link>>(`${this.base}/`, {
      body: { email, password },
      method: 'DELETE',
    })
  }
}
