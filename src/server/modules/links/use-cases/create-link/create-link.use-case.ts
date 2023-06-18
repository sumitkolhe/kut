import { generateShortLink, sanitizeTargetLink } from 'server/modules/links/utils'
import { LinkRepository } from 'server/modules/links/repositories'
import { GenerateAliasUseCase } from 'server/modules/links/use-cases'
import { ErrorType } from 'interfaces/error.interface'
import { HttpExceptionError } from 'server/common/exceptions'
import type { IUseCase } from 'server/common/types'
import type { CreateLinkDto } from 'server/modules/links/dto'

export class CreateLinkUseCase implements IUseCase<CreateLinkDto> {
  private linkRepository: LinkRepository
  private generateAliasUseCase: GenerateAliasUseCase

  constructor() {
    this.linkRepository = new LinkRepository()
    this.generateAliasUseCase = new GenerateAliasUseCase()
  }

  async execute(linkInput: Omit<CreateLinkDto, 'shortUrl'>) {
    const linkAlreadyExists = await this.linkRepository.exists({ alias: linkInput.alias })

    if (linkAlreadyExists) throw new HttpExceptionError(400, ErrorType.aliasAlreadyUsed)

    const { userId, target, description, meta } = linkInput

    const uniqueAlias = linkInput.alias
      ? linkInput.alias
      : await this.generateAliasUseCase.execute()

    const verifiedTarget = sanitizeTargetLink(target)

    const shortUrl = generateShortLink(uniqueAlias)

    return this.linkRepository.create({
      userId: userId!,
      alias: uniqueAlias,
      target: verifiedTarget,
      shortUrl,
      description,
      meta,
    })
  }
}
