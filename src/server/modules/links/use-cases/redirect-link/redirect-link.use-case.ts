import { LinkRepository } from 'server/modules/links/repositories/link.repository'
import { ErrorType } from 'interfaces/error.interface'
import { HttpExceptionError } from 'server/common/exceptions/http.exception'
import type { IUseCase } from 'server/common/types/use-case.type'

export class RedirectLinkUseCase implements IUseCase<String, String> {
  private linkRepository: LinkRepository

  constructor() {
    this.linkRepository = new LinkRepository()
  }

  async execute(alias: string, password?: string) {
    const link = await this.linkRepository.getLinkByAlias(alias)

    if (!link) {
      throw new HttpExceptionError(404, ErrorType.linkNotFound)
    }

    if (link.meta?.active === false) {
      throw new HttpExceptionError(403, ErrorType.linkInactive)
    }

    const currentDate = new Date()
    const validFrom = link.meta?.validFrom ? new Date(link.meta.validFrom) : null
    const validTill = link.meta?.validTill ? new Date(link.meta.validTill) : null

    if ((validFrom && validFrom > currentDate) || (validTill && validTill < currentDate)) {
      throw new HttpExceptionError(403, ErrorType.linkInactive)
    }

    if (link.meta?.maxVisits && link.meta.maxVisits <= link.visitCount!) {
      throw new HttpExceptionError(403, ErrorType.linkViewLimitReached)
    }

    if (link.meta?.password) {
      if (!password) {
        throw new HttpExceptionError(403, ErrorType.linkPasswordProtected)
      }
      if (link.meta.password !== password) {
        throw new HttpExceptionError(400, ErrorType.incorrectlinkPassword)
      }
    }

    await this.linkRepository.incrementLinkVisits(link._id.toString())

    // Add statistics for link visit
    // const newStats = new StatisticsModel({ linkId: link.id, ...statistics }) TODO: add after statistics model is refactored

    // await newStats.save().catch(() => {
    //   logger.error('cannot update link statistics');
    // });

    return link.target
  }
}
