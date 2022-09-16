import mongoose, { Schema } from 'mongoose'
import { AnalyticsModel } from 'models/analytics.model'
import { TagModel } from 'models/tag.model'
import type { Document } from 'mongoose'

export interface LinkDocument extends Document {
  alias: string
  target: string
  shortUrl: string
  visitCount: number
  protected: {
    enabled: boolean
    password: string
  }
  description: string
  analytics: { type: Schema.Types.ObjectId; ref: string }
  tags: { type: Schema.Types.ObjectId; ref: string }
  createdAt: Date
  updatedAt: Date
}

const LinkSchema: Schema = new mongoose.Schema(
  {
    alias: { type: String, required: true, unique: true },
    target: { type: String, required: true },
    shortUrl: { type: String },
    visitCount: { type: Number, default: 0 },
    protected: {
      enabled: {
        type: Number,
        required: false,
      },
      password: {
        type: String,
        required: false,
        select: false,
        default: null,
      },
    },
    description: { type: String, default: null },
    analytics: [{ type: Schema.Types.ObjectId, ref: AnalyticsModel }],
    tags: [{ type: Schema.Types.ObjectId, ref: TagModel }],
  },
  { timestamps: true }
)

export const LinkModel = mongoose.model<LinkDocument>('link', LinkSchema)
