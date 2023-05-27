import { BaseRepository } from 'server/common/classes/base-repository.class'
import { LinkModel } from 'server/modules/links/models/link.model'
import type { CreateLinkInput, LinkDto } from 'server/modules/links/dto/link.dto'

export class LinkRepository extends BaseRepository<LinkDto, LinkDto> {
  constructor() {
    super(LinkModel)
  }

  async getAllLinks(
    userId: string,
    { offset, limit, search }: { offset: number; limit: number; search: string }
  ) {
    const allLinks = await this.model.find(
      {
        $and: [
          { userId },
          {
            $or: [search ? { $text: { $search: search } } : {}],
          },
        ],
      },
      {
        limit,
        skip: offset,
        sort: { createdAt: -1 },
      }
    )

    return allLinks
  }

  async getUserLinkByAlias(userId: string, alias: string) {
    const link = await this.model
      .findOne({
        $and: [{ userId }, { alias }],
      })
      .lean()
      .exec()

    return link
  }

  async getLinkByAlias(alias: string) {
    const links = await this.model.findOne({ alias }).lean().exec()
    return links
  }

  async getTotalLinks(userId: string) {
    return this.model.countDocuments({ userId })
  }

  async deleteLink(userId: string, alias: string) {
    return this.model.deleteOne({ $and: [{ userId }, { alias }] })
  }

  async incrementLinkVisits(id: string) {
    return this.model.updateOne({ _id: id }, { $inc: { visitCount: 1 } })
  }

  async createLink(linkPayload: CreateLinkInput) {
    return await this.model.create({
      userId: linkPayload.userId,
      alias: linkPayload.alias,
      target: linkPayload.target,
      shortUrl: linkPayload.shortUrl,
      description: linkPayload.description,
      meta: {
        password: linkPayload.meta?.password,
        validFrom: linkPayload.meta?.validFrom,
        validTill: linkPayload.meta?.validTill,
        maxVisits: linkPayload.meta?.maxVisits,
        active: linkPayload.meta?.active,
      },
    })
  }
}

export const linkRepository = new LinkRepository()
