import { getModelForClass, index, plugin, prop } from '@typegoose/typegoose'

class Meta {
  @prop({ required: false, default: null, type: String })
  password?: string | null

  @prop({ required: false, default: Date.now(), type: Date })
  validFrom?: Date

  @prop({ required: false, default: null, type: Date })
  validTill?: Date | null

  @prop({ required: false, default: null, type: Number })
  maxVisits?: number | null

  @prop({ required: false, default: true, type: Boolean })
  active?: boolean
}

@plugin(index, { alias: 'text', target: 'text', shortUrl: 'text', description: 'text' })
class LinkClass {
  @prop({ required: true, type: String })
  userId!: string

  @prop({ required: true, unique: true, type: String })
  alias!: string

  @prop({ required: true, type: String })
  target!: string

  @prop({ required: true, type: String })
  shortUrl!: string

  @prop({ default: 0, type: Number })
  visitCount?: number

  @prop({ type: String })
  description?: string | null

  @prop({ _id: false, type: () => Meta })
  meta?: Meta
}

const LinkModel = getModelForClass(LinkClass, {
  schemaOptions: { collection: 'links', timestamps: true },
})

export { LinkModel, LinkClass }
