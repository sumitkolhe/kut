import type { BaseSchema, Model, SchemaOptions } from 'papr'

export class BaseRepository<T extends BaseSchema, U extends SchemaOptions<T>> {
  protected model: Model<T, U>

  constructor(model: Model<T, U>) {
    this.model = model
  }
}
