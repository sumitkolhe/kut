import mongoose from 'mongoose'
import type { Document, Schema } from 'mongoose'

export interface TagDocument extends Document {
  tag: string
  createdAt: Date
  updatedAt: Date
}

const TagSchema: Schema = new mongoose.Schema(
  {
    tag: { type: String, required: false, unique: true },
  },
  { timestamps: true }
)

export const TagModel = mongoose.model<TagDocument>('tag', TagSchema)
