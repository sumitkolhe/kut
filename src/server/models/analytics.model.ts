import { model, Schema, Document, models } from 'mongoose'

interface AnalyticsDocument extends Document {
  visitDate: { type: Date; required: boolean }
  os: {
    windows: boolean
    linux: boolean
    mac: boolean
    android: boolean
  }
  browser: {
    opera: boolean
    ie: boolean
    edge: boolean
    safari: boolean
    firefox: boolean
    chrome: boolean
  }

  details: {
    os: string
    browser: string
    version: string
    platform: string
    source: string
  }

  location: unknown
}

const AnalyticsSchema: Schema = new Schema({
  visitDate: { type: Date, default: Date.now, required: true },
  os: {
    windows: Boolean,
    linux: Boolean,
    mac: Boolean,
    android: Boolean,
  },
  browser: {
    opera: Boolean,
    ie: Boolean,
    edge: Boolean,
    safari: Boolean,
    firefox: Boolean,
    chrome: Boolean,
  },

  details: {
    os: String,
    browser: String,
    version: String,
    platform: String,
    source: String,
  },

  location: Object,
})

export const AnalyticsModel = models.AnalyticsModel || model<AnalyticsDocument>('analytics', AnalyticsSchema)
