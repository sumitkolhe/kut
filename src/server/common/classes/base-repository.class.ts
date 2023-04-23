import { customAlphabet } from 'nanoid'
import type { Document, FilterQuery, Model, UpdateQuery } from 'mongoose'

export interface BaseRepositoryMongo<T extends Document, U> {
  create: (data: U) => Promise<T>
  createMany: (data: U[]) => Promise<T[]>
  getById: (id: string) => Promise<T | null>
  getByIds: (ids: string[]) => Promise<T[]>
  updateById: (id: string, data: any) => Promise<T | null>
  updateByQuery: (query: FilterQuery<T>, item: UpdateQuery<T>) => Promise<T>
  updateMany: (ids: string[], item: UpdateQuery<T>) => Promise<void>
  delete: (id: string) => Promise<T>
  exists: (filter: FilterQuery<T>) => Promise<boolean>
}

export class BaseRepository<
  T extends Document,
  U = Omit<T, '_id' | 'createdAt' | 'updatedAt' | 'id'>
> implements BaseRepositoryMongo<T, U>
{
  protected model: Model<T>

  constructor(model: Model<T>) {
    this.model = model
  }

  create(input: U): Promise<T> {
    return this.model.create(this.format(input))
  }

  createMany(input: U[]): Promise<T[]> {
    return this.model.insertMany(input.map((item) => this.format(item))) as Promise<T[]>
  }

  getById(id: string): Promise<T | null> {
    return this.model.findById(id).lean().exec() as Promise<T | null>
  }

  getByIds(ids: string[]): Promise<T[]> {
    return this.model.find({ _id: { $in: ids } }).exec()
  }

  updateById(id: string, data: any): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, data, { new: true }).exec() as Promise<T | null>
  }

  updateByQuery(query: FilterQuery<T>, item: UpdateQuery<T>): Promise<T> {
    return this.model.findOneAndUpdate(query, item, { new: true }).lean().exec() as Promise<T>
  }

  async updateMany(ids: string[], item: UpdateQuery<T>): Promise<void> {
    await this.model.updateMany({ _id: { $in: ids } }, item).exec()
  }

  delete(id: string): Promise<T> {
    return this.model.findByIdAndDelete(id).lean().exec() as Promise<T>
  }

  async deleteById(id: string): Promise<boolean> {
    const docDeleted = await this.model.deleteOne({ _id: id }).exec()
    return docDeleted?.deletedCount === 1
  }

  async exists(filter: FilterQuery<T>): Promise<boolean> {
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

  count(filter?: FilterQuery<T>): Promise<number> {
    return this.model.countDocuments(filter).exec()
  }

  protected format(input: Partial<T> | U) {
    return {
      _id: generateId(),
      ...input,
    }
  }
}

const alphabet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

export const generateNanoId = customAlphabet(alphabet, 8)

export const generateId = customAlphabet(alphabet, 16)
