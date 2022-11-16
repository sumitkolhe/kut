import { LinkModel } from 'server/models/link.model'
import { HttpExceptionError } from 'server/exceptions/http.exception'
import { UserModel } from 'server/models/user.model'
import { createShortLink, verifyTargetLink } from 'server/utils/link'
import { ErrorType } from 'interfaces/error.interface'
import { AnalyticsModel } from 'server/models/analytics.model'
import { logger } from 'server/utils/logger'
import type { Analytics } from 'interfaces/analytics.interface'
import type { LinkDocument } from 'server/models/link.model'
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
      target: verifyTargetLink(linkPayload.target as string),
      shortUrl: createShortLink(alias),
      description: linkPayload.description,
      meta: {
        password: linkPayload.meta?.password,
        validFrom: linkPayload.meta?.validFrom,
        validTill: linkPayload.meta?.validTill,
        maxVisits: linkPayload.meta?.maxVisits,
        active: linkPayload.meta?.active,
      },
    })

    const savedLink = await newLink.save().catch(() => {
      throw new HttpExceptionError(400, ErrorType.aliasAlreadyUsed)
    })

    await UserModel.findOneAndUpdate({ email }, { $push: { userLinks: savedLink } }).catch(() => {
      logger.error('cannot update user links')
    })

    return savedLink
  }

  public getAllLinks = async (
    email: string,
    offset: number,
    limit: number
  ): Promise<{
    links: Link[]
    total: number
  }> => {
    const result = await UserModel.findOne(
      { email },
      {
        select: ['userLinks'],
        _id: false,
      }
    ).populate({
      path: 'userLinks',
      options: {
        sort: { createdAt: -1 },
        skip: offset,
        limit,
      },
    })

    const count = await UserModel.aggregate([
      { $match: { email } },
      { $unwind: '$userLinks' },
      { $count: 'total' },
    ])

    return {
      links: (result?.userLinks as unknown as Link[]) || [],
      total: (count[0]?.total as number) || 0,
    }
  }

  public redirect = async (alias: string, analytics: Analytics | undefined) => {
    const link: LinkDocument | null = await LinkModel.findOne({ alias })

    if (!link) throw new HttpExceptionError(404, ErrorType.linkNotFound)

    if (!link.meta.active) throw new HttpExceptionError(403, 'link is not active')

    // if validTill exists and validFrom and validTill are not within limit, throw error
    if (
      link.meta.validTill &&
      (link.meta.validFrom > new Date() || link.meta.validTill < new Date())
    )
      throw new HttpExceptionError(403, 'link is not active')

    if (link.meta.maxVisits && link.meta.maxVisits <= link.visitCount)
      throw new HttpExceptionError(403, 'maximum link view limit reached')

    // if (link.meta.password && password && link.meta.password === password)

    const newAnalytics = new AnalyticsModel(analytics)
    await newAnalytics.save()

    if (link) {
      await LinkModel.findOneAndUpdate(
        { alias },
        { $push: { analytics: newAnalytics }, $inc: { visitCount: 1 } }
      ).catch(() => {
        logger.error('cannot update link analytics')
      })
    }

    return link.target.toString()
  }

  private generateUniqueAlias = async (): Promise<string> => {
    let randomAlias = ''
    const characterSet = 'abcdefghijklmnopqrstuvwxyz1234567890'

    for (let i = 0; i < 6; i++) {
      randomAlias += characterSet.charAt(Math.floor(Math.random() * characterSet.length))
    }

    const isAliasAvailable = await LinkModel.findOne({ alias: randomAlias })

    if (isAliasAvailable) {
      const alias = await this.generateUniqueAlias()
      return alias
    } else {
      return randomAlias
    }
  }
}
