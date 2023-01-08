export type StatisticsPeriod = '1h' | '24h' | '7d' | '30d' | '180d' | 'all'

export interface Statistics {
  visitDate?: Date
  os: {
    windows: Boolean | undefined
    linux: Boolean | undefined
    mac: Boolean | undefined
    android: Boolean | undefined
  }
  browser: {
    opera: Boolean | undefined
    ie: Boolean | undefined
    edge: Boolean | undefined
    safari: Boolean | undefined
    firefox: Boolean | undefined
    chrome: Boolean | undefined
  }
  details: {
    os: String | undefined
    browser: String | undefined
    version: String | undefined
    platform: String | undefined
    source: String | undefined
  }
  location: {
    country: String | undefined
    city: String | undefined
    timezone: String | undefined
    latitude: String | undefined
    longitude: String | undefined
    region: String | undefined
  }
}
