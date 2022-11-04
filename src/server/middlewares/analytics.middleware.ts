import type { NextFunction, Request, Response } from 'express'

export const analyticsHandler = (req: Request, _res: Response, next: NextFunction) => {
  req.analytics = {
    os: {
      windows: req?.useragent?.isWindows,
      linux: req?.useragent?.isLinux,
      mac: req?.useragent?.isMac,
      android: req?.useragent?.isAndroid,
    },
    browser: {
      opera: req?.useragent?.isOpera,
      ie: req?.useragent?.isIE,
      edge: req?.useragent?.isEdge,
      safari: req?.useragent?.isSafari,
      firefox: req?.useragent?.isFirefox,
      chrome: req?.useragent?.isChrome,
    },
    details: {
      os: req?.useragent?.os,
      browser: req?.useragent?.browser,
      version: req?.useragent?.version,
      platform: req?.useragent?.platform,
      source: req?.useragent?.source,
    },
    // only available on vercel
    location: {
      country: req.headers['x-vercel-ip-country'] as string,
      city: req.headers['x-vercel-ip-city'] as string,
      timezone: req.headers['x-vercel-ip-timezone'] as string,
      latitude: req.headers['x-vercel-ip-latitude'] as string,
      longitude: req.headers['x-vercel-ip-longitude'] as string,
      region: req.headers['x-vercel-ip-region'] as string,
    },
  }

  next()
}
