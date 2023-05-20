import { LinkRepository } from 'server/modules/links/repositories/link.repository'
import type { IUseCase } from 'server/common/types/use-case.type'
import { HttpExceptionError } from '~/server/common/exceptions/http.exception'

export class GenerateAliasUseCase implements IUseCase<String> {
  private linkRepository: LinkRepository

  constructor() {
    this.linkRepository = new LinkRepository()
  }

  async execute(): Promise<string> {
    const characterSet = 'abcdefghijklmnopqrstuvwxyz1234567890'
    const maxAttempts = 10 // Maximum number of attempts to find a unique alias

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      let randomAlias = ''

      for (let i = 0; i < 6; i++) {
        randomAlias += characterSet.charAt(Math.floor(Math.random() * characterSet.length))
      }

      const linkAlreadyExists = await this.linkRepository.getLinkByAlias(randomAlias)

      if (!linkAlreadyExists) {
        return randomAlias
      }
    }

    throw new HttpExceptionError(500, 'Error creating a new link. Please try again.')
  }
}
