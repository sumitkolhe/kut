import { model, Schema, Document, models } from 'mongoose'
import { AnalyticsModel } from './analytics.model'

export interface LinkDocument extends Document {
  alias: string
  longUrl: string
  shortUrl: string
  visitCount: number
  password: string
  passwordProtected: boolean
  description: string
  analytics: { type: Schema.Types.ObjectId; ref: string }
  createdAt: Date
  updatedAt: Date
}

const LinkSchema = new Schema(
  {
    alias: { type: String, required: true, unique: true },
    longUrl: { type: String, required: true },
    shortUrl: { type: String },
    visitCount: { type: Number, default: 0 },
    password: { type: String, select: false, default: null },
    passwordProtected: { type: Boolean, default: false },
    description: { type: String, default: null },
    analytics: [{ type: Schema.Types.ObjectId, ref: AnalyticsModel }],
  },
  { timestamps: true }
)

LinkSchema.index({ alias: 1 }, { unique: true })

export const LinkModel = models.LinkModel || model<LinkDocument>('link', LinkSchema)
