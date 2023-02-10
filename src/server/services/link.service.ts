import { LinkModel } from 'server/models/link.model'
import { HttpExceptionError } from 'server/exceptions/http.exception'
import { createShortLink, verifyTargetLink } from 'server/utils/link'
import { ErrorType } from 'interfaces/error.interface'
import { logger } from 'server/utils/logger'
import { StatisticsModel } from 'server/models/statistics.model'
import type { Statistics } from '~~/src/interfaces/statistics.interface'
import type { LinkDocument } from 'server/models/link.model'
import type { Link } from 'interfaces/link.interface'

export class LinkService {
  private linkModel: typeof LinkModel

  constructor() {
    this.linkModel = LinkModel
  }

  public getAllLinks = async (
    userId: string,
    offset: number,
    limit: number,
    search: string
  ): Promise<{
    links: Link[]
    total: number
  }> => {
    const allLinks = await this.linkModel
      .find({ $and: [{ userId }, search ? { $text: { $search: search } } : {}] })
      .select({ __v: 0, _id: 0, userId: 0, meta: 0 })
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit)

    const linksCount = await this.linkModel.find({ userId }).count()

    return {
      links: allLinks.map((r) => r.toObject()),
      total: linksCount,
    }
  }

  public getLink = async (userId: string, alias: string) => {
    const link = await this.linkModel
      .findOne({ userId, alias })
      .select({ __v: 0, userId: 0, _id: 0, meta: { password: 0 } })

    return link ? (link?.toObject() as Link) : null
  }

  public createLink = async (
    userId: string,
    linkPayload: Partial<Pick<Link, 'target' | 'alias' | 'description' | 'meta'>>
  ) => {
    // if alias is not provided, generate new alias
    const alias = linkPayload.alias ? linkPayload.alias : await this.generateUniqueAlias()

    const verifiedTarget = verifyTargetLink(linkPayload.target as string)

    const newLink: LinkDocument = new this.linkModel({
      userId,
      alias,
      target: verifiedTarget,
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

    return savedLink?.toObject()
  }

  // public updateLink = async (
  //   email: string,
  //   alias: string,
  //   linkPayload: Partial<Pick<Link, 'target' | 'alias' | 'description' | 'meta'>>
  // ) => {
  //   const result = await UserModel.findOne({ email }).populate({
  //     path: 'userLinks',
  //     match: { alias },
  //   })

  //   console.log(linkPayload)

  //   if (result?.userLinks) {
  //     const updatedLink = await this.linkModel.updateOne(
  //       { alias },
  //       {
  //         alias,
  //         target: verifyTargetLink(linkPayload.target as string),
  //         shortUrl: createShortLink(alias),
  //         description: linkPayload.description,
  //         meta: {
  //           password: linkPayload.meta?.password,
  //           validFrom: linkPayload.meta?.validFrom
  //             ? new Date(linkPayload.meta?.validFrom)
  //             : new Date(),
  //           validTill: linkPayload.meta?.validTill
  //             ? new Date(linkPayload.meta.validTill)
  //             : new Date(),
  //           maxVisits: linkPayload.meta?.maxVisits,
  //           active: linkPayload.meta?.active,
  //         },
  //       }
  //     )

  //     console.log(updatedLink)
  //   }

  //   const newLink: LinkDocument = new this.linkModel({
  //     alias,
  //     target: verifyTargetLink(linkPayload.target as string),
  //     shortUrl: createShortLink(alias),
  //     description: linkPayload.description,
  //     meta: {
  //       password: linkPayload.meta?.password,
  //       validFrom: linkPayload.meta?.validFrom,
  //       validTill: linkPayload.meta?.validTill,
  //       maxVisits: linkPayload.meta?.maxVisits,
  //       active: linkPayload.meta?.active,
  //     },
  //   })

  //   const savedLink = await newLink.save().catch(() => {
  //     throw new HttpExceptionError(400, ErrorType.aliasAlreadyUsed)
  //   })

  //   await UserModel.findOneAndUpdate({ email }, { $push: { userLinks: savedLink } }).catch(() => {
  //     logger.error('cannot update user links')
  //   })

  //   return savedLink
  // }

  public deleteLink = async (userId: string, alias: string) => {
    await this.linkModel.findOneAndDelete({ userId, alias })
  }

  public redirectLink = async (
    alias: string,
    statistics: Statistics | undefined,
    password?: string
  ) => {
    const link: LinkDocument | null = await this.linkModel.findOne({ alias })

    if (!link) throw new HttpExceptionError(404, ErrorType.linkNotFound)
    if (!link.meta.active) throw new HttpExceptionError(403, ErrorType.linkInactive)

    // if validTill exists and validFrom and validTill are not within limit, throw error
    const isValidDate = link.meta.validFrom > new Date() || link.meta.validTill < new Date()

    if (link.meta.validTill && isValidDate)
      throw new HttpExceptionError(403, ErrorType.linkInactive)

    if (link.meta.maxVisits && link.meta.maxVisits <= link.visitCount)
      throw new HttpExceptionError(403, ErrorType.linkViewLimitReached)

    // check if link is password protected
    if (link.meta.password && !password)
      throw new HttpExceptionError(403, ErrorType.linkPasswordProtected)
    else if (link.meta.password && password && link.meta.password !== password)
      throw new HttpExceptionError(400, ErrorType.incorrectlinkPassword)

    // increment visit count
    await link.updateOne({ $inc: { visitCount: 1 } })

    // add statistics for link visit
    const newStats = new StatisticsModel({ linkId: link.id, ...statistics })

    await newStats.save().catch(() => {
      logger.error('cannot update link statistics')
    })

    return link.target.toString()
  }

  private generateUniqueAlias = async (): Promise<string> => {
    const characterSet = 'abcdefghijklmnopqrstuvwxyz1234567890'

    let randomAlias = ''

    for (let i = 0; i < 6; i++) {
      randomAlias += characterSet.charAt(Math.floor(Math.random() * characterSet.length))
    }

    const isAliasAvailable = await this.linkModel.findOne({ alias: randomAlias })

    return isAliasAvailable ? await this.generateUniqueAlias() : randomAlias
  }
}
