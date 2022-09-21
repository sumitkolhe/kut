import { LinkModel } from 'models/link.model'
import { HttpExceptionError } from 'exceptions/http.exception'
import { UserModel } from 'models/user.model'
import { createShortLink } from 'utils/link'
// import { AnalyticsModel } from 'models/analytics.model'
import { ErrorType } from 'interfaces/error.interface'
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
      throw new HttpExceptionError(400, ErrorType.aliasAlreadyUsed)
    })

    await UserModel.findOneAndUpdate({ email }, { $push: { userLinks: savedLink } }).catch(() => {
      throw new HttpExceptionError(400, 'cannot update user links')
    })

    return savedLink
  }

  public redirect = async (alias: string) => {
    const link: LinkDocument | null = await LinkModel.findOne({ alias })

    // const new_analytic = new AnalyticsModel(req.useragent)
    // await new_analytic.save()
    // await link_details.analytics.push(new_analytic)
    // link_details.visit_count++
    // await link_details.save()

    if (!link) throw new HttpExceptionError(404, ErrorType.linkNotFound)

    // if validTill exists and validFrom and validTill are not within limit, throw error
    if (link.meta.validTill && (link.meta.validFrom > new Date() || link.meta.validTill < new Date()))
      throw new HttpExceptionError(400, 'link is not active')

    if (link.meta.maxVisits && link.meta.maxVisits <= link.visitCount)
      throw new HttpExceptionError(400, 'maximum link view limit reached')

    // if (link.meta.password && password && link.meta.password === password)
    return link.target.toString()

    // throw new HttpExceptionError(400, 'something went wrong')
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
