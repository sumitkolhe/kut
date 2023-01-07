import mongoose from 'mongoose'
import type { Document, Schema } from 'mongoose'

interface StatisticsDocument extends Document {
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
  location: {
    country: string
    city: string
    timezone: string
    latitude: string
    longitude: string
    region: string
  }
}

const StatisticsSchema: Schema = new mongoose.Schema({
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
  location: {
    country: String,
    city: String,
    timezone: String,
    latitude: String,
    longitude: String,
    region: String,
  },
})

export const StatisticsModel = mongoose.model<StatisticsDocument>('statistics', StatisticsSchema)
