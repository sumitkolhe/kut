import { LinkModel } from 'models/link.model'
import { HttpExceptionError } from 'exceptions/http.exception'
import { UserModel } from 'models/user.model'
import { createShortLink } from 'utils/link'
import type { LinkDocument } from 'models/link.model'
import type { Link } from 'interfaces/link.interface'

export class LinkService {
  public shorten = async (
    email: string,
    linkPayload: Partial<Pick<Link, 'target' | 'alias' | 'description' | 'meta'>>
  ) => {
    // if alias is not provided, generate new alias
    const alias = linkPayload.alias ? linkPayload.alias : await this.generateUniqueAlias()

    const newLink: LinkDocument = new LinkModel({
      alias,
      target: linkPayload.target,
      shortUrl: createShortLink(alias),
      description: linkPayload.description,
      meta: {
        password: linkPayload.meta?.password,
        validFrom: linkPayload.meta?.validFrom,
        validTill: linkPayload.meta?.validTill,
        maxVisits: linkPayload.meta?.maxVisits,
      },
    })

    const savedLink = await newLink.save().catch(() => {
      throw new HttpExceptionError(400, 'alias is already in use')
    })

    await UserModel.findOneAndUpdate({ email }, { $push: { userLinks: savedLink } }).catch(() => {
      throw new HttpExceptionError(400, 'cannot update user links')
    })

    return savedLink
  }

  private generateUniqueAlias = async (): Promise<string> => {
    let randomAlias = ''
    const characterSet = 'abcdefghijklmnopqrstuvwxyz1234567890'

    for (let i = 0; i < 6; i++) {
      randomAlias += characterSet.charAt(Math.floor(Math.random() * characterSet.length))
    }

    const isAliasAvailable = await LinkModel.findOne({ alias: randomAlias })

    return isAliasAvailable ? await this.generateUniqueAlias() : randomAlias
  }
}
