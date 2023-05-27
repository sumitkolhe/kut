import { LinkRepository } from 'server/modules/links/repositories/link.repository'
import { CreateLinkUseCase } from 'server/modules/links/use-cases/create-link/create-link.use-case'
import { RedirectLinkUseCase } from 'server/modules/links/use-cases/redirect-link/redirect-link.use-case'
import type { Statistics } from 'server/common/types/statistics.interface'
import type { CreateLinkInput } from 'server/modules/links/dto/link.dto'

export class LinkService {
  private linkRepository: LinkRepository
  private createLinkUseCase: CreateLinkUseCase
  private redirectLinkUseCase: RedirectLinkUseCase

  constructor() {
    this.linkRepository = new LinkRepository()
    this.createLinkUseCase = new CreateLinkUseCase()
    this.redirectLinkUseCase = new RedirectLinkUseCase()
  }

  public createLink = async (createLinkInput: Omit<CreateLinkInput, 'shortUrl'>) => {
    return this.createLinkUseCase.execute(createLinkInput)
  }

  public getAllLinks = async (userId: string, offset: number, limit: number, search: string) => {
    const [allLinks, totalCount] = await Promise.all([
      this.linkRepository.getAllLinks(userId, { offset, limit, search }),
      this.linkRepository.getTotalLinks(userId),
    ])

    return { links: allLinks, total: totalCount }
  }

  public getLink = async (userId: string, alias: string) => {
    return this.linkRepository.getUserLinkByAlias(userId, alias)
  }

  public deleteLink = async (userId: string, alias: string) => {
    return this.linkRepository.deleteLink(userId, alias)
  }

  public redirectLink = async (alias: string, statistics: Statistics, password?: string) => {
    return this.redirectLinkUseCase.execute(alias, statistics, password)
  }
}
