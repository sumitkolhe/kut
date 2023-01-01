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
  public createLink = async (
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
    limit: number,
    search: string
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
      match: search ? { $text: { $search: search } } : {},
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

  public getLinkByAlias = async (alias: string, analytics: Analytics | undefined) => {
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

  public deleteLink = async (email: string, alias: string) => {
    // delete link from links collection
    const deletedLink = await LinkModel.findOneAndDelete({ alias })

    // remove link reference from users collection object
    await UserModel.findOneAndUpdate(
      { email },
      { $pull: { userLinks: deletedLink?.id } },
      { multi: true }
    )
  }

  public statistics = async (alias: string) => {
    const analytics = await LinkModel.aggregate([
      { $match: { alias } },
      {
        $lookup: {
          from: 'analytics',
          localField: 'analytics',
          foreignField: '_id',
          as: 'analytics',
        },
      },
      { $unwind: '$analytics' },
      {
        $group: {
          _id: null,
          visitCount: { $first: '$visitCount' },
          description: { $first: '$description' },
          alias: { $first: '$alias' },
          shortUrl: { $first: '$shortUrl' },
          target: { $first: '$target' },
          createdAt: { $first: '$createdAt' },

          windows: {
            $sum: { $cond: ['$analytics.os.windows', 1, 0] },
          },
          linux: {
            $sum: { $cond: ['$analytics.os.linux', 1, 0] },
          },
          mac: {
            $sum: { $cond: ['$analytics.os.mac', 1, 0] },
          },
          android: {
            $sum: { $cond: ['$analytics.os.android', 1, 0] },
          },
          opera: {
            $sum: { $cond: ['$analytics.browser.opera', 1, 0] },
          },
          ie: {
            $sum: { $cond: ['$analytics.browser.ie', 1, 0] },
          },
          edge: {
            $sum: { $cond: ['$analytics.browser.edge', 1, 0] },
          },
          safari: {
            $sum: {
              $cond: ['$analytics.browser.safari', 1, 0],
            },
          },
          firefox: {
            $sum: {
              $cond: ['$analytics.browser.firefox', 1, 0],
            },
          },
          chrome: {
            $sum: {
              $cond: ['$analytics.browser.chrome', 1, 0],
            },
          },
        },
      },
      {
        $addFields: {
          analytics: {
            os: {
              windows: '$windows',
              linux: '$linux',
              mac: '$mac',
              android: '$android',
            },
            browser: {
              opera: '$opera',
              ie: '$ie',
              edge: '$edge',
              safari: '$safari',
              firefox: '$firefox',
              chrome: '$chrome',
            },
          },
          windows: '$$REMOVE',
          linux: '$$REMOVE',
          mac: '$$REMOVE',
          android: '$$REMOVE',
          opera: '$$REMOVE',
          ie: '$$REMOVE',
          edge: '$$REMOVE',
          safari: '$$REMOVE',
          firefox: '$$REMOVE',
          chrome: '$$REMOVE',
        },
      },
    ])

    const views = await LinkModel.aggregate([
      { $match: { alias } },
      {
        $lookup: {
          from: 'analytics',
          let: {
            analytics: '$analytics',
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $in: ['$_id', '$$analytics'],
                },
              },
            },
            {
              $group: {
                _id: {
                  $substr: ['$visitDate', 0, 35],
                },
                v: {
                  $sum: 1,
                },
              },
            },
            {
              $project: {
                _id: 0,
                k: '$_id',
                v: 1,
              },
            },
          ],
          as: 'visitData',
        },
      },
      {
        $addFields: {
          visitData: {
            $arrayToObject: '$visitData',
          },
        },
      },
    ])

    if (analytics.length > 0) {
      analytics[0].analytics.views = views[0]?.visitData
      return analytics[0]
    } else {
      return null
    }
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
