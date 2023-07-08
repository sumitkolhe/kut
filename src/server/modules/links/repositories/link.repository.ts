import { BaseRepository } from 'server/common/classes/base-repository.class'
import { LinkModel } from 'server/modules/links/models/link.model'
import type { LinkDto } from 'server/modules/links/dto'
import type { Paginator } from 'server/modules/links/types/pagination.type'

export class LinkRepository extends BaseRepository<LinkDto, LinkDto> {
  constructor() {
    super(LinkModel)
  }

  async getAllLinks(userId: string, { offset, limit, search, sortOptions }: Paginator) {
    return this.model
      .find({
        $and: [{ userId }, search ? { $text: { $search: search } } : {}],
      })
      .limit(limit)
      .skip(offset)
      .sort(sortOptions)
      .lean()
      .exec()
  }

  async getUserLinkByAlias(userId: string, alias: string) {
    return this.model
      .findOne({ $and: [{ userId }, { alias }] })
      .lean()
      .exec()
  }

  async getLinkByAlias(alias: string) {
    return this.model.findOne({ alias }).lean().exec()
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
}

export const linkRepository = new LinkRepository()
