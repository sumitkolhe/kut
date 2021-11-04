export interface analyticsDetailsInterface {
  visitDate: Date
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
