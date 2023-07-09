import type { Paginator } from 'server/modules/links/types'
import type { CustomResponse } from 'server/common/types/response.interface'
import type { $Fetch } from 'ofetch'
import type { CreateLinkDto, LinkDto } from 'server/modules/links/dto'

export class LinkService {
  private http: $Fetch
  private base: string

  constructor() {
    const {
      $apiService: { http },
    } = useNuxtApp()

    this.http = http
    this.base = '/links'
  }

  public async shorten(linkPayload: CreateLinkDto) {
    return this.http<CustomResponse<LinkDto>>(`${this.base}/shorten`, {
      body: linkPayload,
      method: 'POST',
    })
  }

  public async fetchLinks(options: Paginator) {
    return this.http<CustomResponse<{ links: LinkDto[]; total: number }>>(`${this.base}`, {
      query: { ...options },
      method: 'GET',
    })
  }

  public async fetchLink(alias: string) {
    return this.http<CustomResponse<LinkDto>>(`${this.base}/${alias}`, {
      method: 'GET',
    })
  }

  public async redirectProtectedLink(alias: string, useragent: string, password: string) {
    return this.http<CustomResponse<string>>(`${this.base}/redirect/${alias}`, {
      body: { password },
      headers: {
        'user-agent': useragent,
      },
      method: 'POST',
    })
  }

  public async deleteLink(alias: string) {
    return this.http<CustomResponse<LinkDto>>(`${this.base}/${alias}`, {
      method: 'DELETE',
    })
  }
}
