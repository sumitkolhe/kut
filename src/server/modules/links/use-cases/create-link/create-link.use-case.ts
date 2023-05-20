import { createShortLink, sanitizeTargetLink } from 'server/modules/links/utils/link.util'
import { LinkRepository } from 'server/modules/links/repositories/link.repository'
import { GenerateAliasUseCase } from 'server/modules/links/use-cases/generate-alias/generate-alias.use-case'
import { ErrorType } from 'interfaces/error.interface'
import { HttpExceptionError } from 'server/common/exceptions/http.exception'
import type { CreateLinkInput } from 'server/modules/links/dto/link.dto'
import type { IUseCase } from 'server/common/types/use-case.type'

export class CreateLinkUseCase implements IUseCase<CreateLinkInput> {
  private linkRepository: LinkRepository
  private generateAliasUseCase: GenerateAliasUseCase

  constructor() {
    this.linkRepository = new LinkRepository()
    this.generateAliasUseCase = new GenerateAliasUseCase()
  }

  async execute(linkInput: Omit<CreateLinkInput, 'shortUrl'>) {
    const linkAlreadyExists = await this.linkRepository.linkExists(linkInput.alias)

    if (linkAlreadyExists) throw new HttpExceptionError(400, ErrorType.aliasAlreadyUsed)

    const { userId, target, description, meta } = linkInput

    const uniqueAlias = linkInput.alias
      ? linkInput.alias
      : await this.generateAliasUseCase.execute()
    const verifiedTarget = sanitizeTargetLink(target)

    return this.linkRepository.createLink({
      userId,
      alias: uniqueAlias,
      target: verifiedTarget,
      shortUrl: createShortLink(uniqueAlias),
      description,
      meta: {
        password: meta?.password,
        validFrom: meta?.validFrom,
        validTill: meta?.validTill,
        maxVisits: meta?.maxVisits,
        active: meta?.active,
      },
    })
  }
}
