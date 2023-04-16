import mongoose from 'mongoose'
import type { Document, Schema } from 'mongoose'

export interface LinkDocument extends Document {
  userId: Schema.Types.ObjectId
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
    active: boolean
  }
  createdAt: Date
  updatedAt: Date
}

const LinkSchema: Schema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, unique: false },
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
      active: {
        type: Boolean,
        required: false,
        default: true,
      },
    },
  },
  { timestamps: true }
)

LinkSchema.index({
  alias: 'text',
  target: 'text',
  shortUrl: 'text',
  description: 'text',
})

export const LinkModel = mongoose.model<LinkDocument>('link', LinkSchema)