import { Schema, model } from 'mongoose'

export const LinkSchema = new Schema(
  {
    userId: { type: String, required: true },
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

export const LinkModel = model('link', LinkSchema)
