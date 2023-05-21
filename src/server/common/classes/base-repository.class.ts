import type { FilterQuery, Model } from 'mongoose'

export class BaseRepository<T> {
  protected model: Model<T>

  constructor(model: Model<T>) {
    this.model = model
  }

  async exists(filter: FilterQuery<T>): Promise<boolean> {
    const exists = await this.model.exists(filter)
    if (typeof exists === 'boolean') return exists
    return !!exists?._id
  }
}
