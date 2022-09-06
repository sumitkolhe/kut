import mongoose from 'mongoose'
import type { Document, Schema } from 'mongoose'

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
  },
  { timestamps: true }
)

// LinkSchema.index({ alias: 1 }, { unique: true })

export const LinkModel = mongoose.model<LinkDocument>('link', LinkSchema)
