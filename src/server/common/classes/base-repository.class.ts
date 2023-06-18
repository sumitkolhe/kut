import type { FilterQuery, Model, UpdateQuery } from 'mongoose'

export class BaseRepository<Response, Request> {
  constructor(readonly model: Model<Response>) {
    this.model = model
  }

  // create
  async create(input: Request) {
    const response = await this.model.create(input)
    return response.toObject()
  }

  createMany(input: Request[]): Promise<Response[]> {
    return this.model.insertMany(input.map((item) => item)) as Promise<Response[]>
  }

  // read
  getById(id: string): Promise<Response | null> {
    return this.model.findById(id).lean().exec() as Promise<Response | null>
  }

  getByIds(ids: string[]): Promise<Response[]> {
    return this.model.find({ _id: { $in: ids } }).exec()
  }

  async exists(filter: FilterQuery<Response>): Promise<boolean> {
    const exists = await this.model.exists(filter)
    if (typeof exists === 'boolean') return exists
    return !!exists?._id
  }

  existsById(id: string): Promise<boolean> {
    return this.exists({ _id: id })
  }

  async existsIds(ids: string[]): Promise<boolean> {
    const count = await this.model.countDocuments({ _id: { $in: ids } }).exec()
    return count === ids.length
  }

  count(filter?: Partial<Response>): Promise<number> {
    return this.model.countDocuments(filter).exec()
  }

  // update
  update(id: string, item: UpdateQuery<Response>): Promise<Response> {
    return this.model.findByIdAndUpdate(id, item, { new: true }).lean().exec() as Promise<Response>
  }

  updateByQuery(query: FilterQuery<Response>, item: UpdateQuery<Response>): Promise<Response> {
    return this.model
      .findOneAndUpdate(query, item, { new: true })
      .lean()
      .exec() as Promise<Response>
  }

  async updateMany(ids: string[], item: UpdateQuery<Response>): Promise<void> {
    await this.model.updateMany({ _id: { $in: ids } }, item).exec()
  }

  // delete
  delete(id: string): Promise<Response> {
    return this.model.findByIdAndDelete(id).lean().exec() as Promise<Response>
  }

  async deleteById(id: string): Promise<boolean> {
    const docDeleted = await this.model.deleteOne({ _id: id }).exec()
    return docDeleted?.deletedCount === 1
  }
}
