import mongoose, { Schema } from 'mongoose'
import { AnalyticsModel } from 'server/models/analytics.model'
import { TagModel } from 'server/models/tag.model'
import type { Document } from 'mongoose'

export interface LinkDocument extends Document {
  alias: string
  target: string
  shortUrl: string
  visitCount: number
  description: string
  meta: {
    password: string
    validFrom: Date
    validTill: Date
    maxVisits: number
  }
  analytics: { type: Schema.Types.ObjectId; ref: string }
  tags: { type: Schema.Types.ObjectId; ref: string }
  createdAt: Date
  updatedAt: Date
}

const LinkSchema: Schema = new mongoose.Schema(
  {
    alias: { type: String, required: true, unique: true },
    target: { type: String, required: true },
    shortUrl: { type: String, required: true },
    visitCount: { type: Number, default: 0, required: false },
    description: { type: String, required: false, default: null },
    meta: {
      password: {
        type: String,
        required: false,
        default: null,
      },
      validFrom: {
        type: Date,
        required: false,
        default: Date.now(),
      },
      validTill: {
        type: Date,
        required: false,
        default: null,
      },
      maxVisits: {
        type: Number,
        required: false,
        default: null,
      },
    },
    analytics: [{ type: Schema.Types.ObjectId, ref: AnalyticsModel }],
    tags: [{ type: Schema.Types.ObjectId, ref: TagModel }],
  },
  { timestamps: true }
)

export const LinkModel = mongoose.model<LinkDocument>('link', LinkSchema)
