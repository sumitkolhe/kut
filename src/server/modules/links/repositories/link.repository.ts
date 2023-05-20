import { BaseRepository } from 'server/common/classes/base-repository.class'
import { LinkModel } from 'server/modules/links/models/link.model'
import type { ObjectId } from 'mongodb'
import type {
  CreateLinkInput,
  LinkDto,
  LinkDtoWithDefaults,
} from 'server/modules/links/dto/link.dto'

export class LinkRepository extends BaseRepository<LinkDto, LinkDtoWithDefaults> {
  constructor() {
    super(LinkModel)
  }

  async getAllLinks(
    userId: ObjectId,
    { offset, limit, search }: { offset: number; limit: number; search: string }
  ) {
    // .find is not async, .toArray is.
    const allLinks = await this.model.collection
      .find({
        $and: [{ userId }, search ? { $text: { $search: search } } : {}],
      })
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit)

    return allLinks.toArray()
  }

  async getUserLinkByAlias(userId: ObjectId, alias: string) {
    const link = await this.model.collection.findOne({
      $and: [{ userId }, { alias }],
    })
    return link
  }

  async getLinkByAlias(alias: string) {
    const links = await this.model.findOne({ alias })
    return links
  }

  async getTotalLinks(userId: ObjectId) {
    return this.model.countDocuments({ userId })
  }

  async deleteLink(userId: ObjectId, alias: string) {
    return this.model.deleteOne({ $and: [{ userId }, { alias }] })
  }

  async incrementLinkVisits(id: ObjectId) {
    return this.model.updateOne({ _id: id }, { $inc: { visitCount: 1 } })
  }

  async createLink(linkPayload: CreateLinkInput) {
    console.log(linkPayload)
    return await this.model.insertOne({
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
