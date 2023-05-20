import { LinkRepository } from 'server/modules/links/repositories/link.repository'
import { ErrorType } from 'interfaces/error.interface'
import { HttpExceptionError } from 'server/common/exceptions/http.exception'
import type { IUseCase } from 'server/common/types/use-case.type'
import type { Statistics } from 'server/common/types/statistics.interface'

export class RedirectLinkUseCase implements IUseCase<String, String> {
  private linkRepository: LinkRepository

  constructor() {
    this.linkRepository = new LinkRepository()
  }

  async execute(alias: string, statistics: Statistics, password?: string) {
    const link = await this.linkRepository.getLinkByAlias(alias)

    if (!link) {
      throw new HttpExceptionError(404, ErrorType.linkNotFound)
    }

    if (link.meta?.active === false) {
      throw new HttpExceptionError(403, ErrorType.linkInactive)
    }

    const currentDate = new Date()

    if (
      (link.meta?.validFrom && new Date(link.meta.validFrom) > currentDate) ||
      (link.meta?.validTill && new Date(link.meta.validTill) < currentDate)
    ) {
      throw new HttpExceptionError(403, ErrorType.linkInactive)
    }

    if (link.meta?.maxVisits && link.meta.maxVisits <= link.visitCount) {
      throw new HttpExceptionError(403, ErrorType.linkViewLimitReached)
    }

    if (link.meta?.password && !password) {
      throw new HttpExceptionError(403, ErrorType.linkPasswordProtected)
    }

    if (link.meta?.password && password && link.meta?.password !== password) {
      throw new HttpExceptionError(400, ErrorType.incorrectlinkPassword)
    }

    // increment visit count
    await this.linkRepository.incrementLinkVisits(link._id)

    console.log('statistics', statistics)

    // add statistics for link visit
    // const newStats = new StatisticsModel({ linkId: link.id, ...statistics }) TODO: add after statistics model is refactored

    // await newStats.save().catch(() => {
    //   logger.error('cannot update link statistics')
    // })

    return link.target
  }
}
