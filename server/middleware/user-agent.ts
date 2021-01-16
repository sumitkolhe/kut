export const userAgent = (req: any, _res: any, next: () => void) => {
	req.useragent = {
		os: req.useragent.os,
		mobile: req.useragent.isMobile,
		tablet: req.useragent.isTablet,
		desktop: req.useragent.isDesktop,
		browser: req.useragent.browser,
		version: req.useragent.version,
		platform: req.useragent.platform,
		location: req.useragent.geoIp,
		source: req.useragent.source,
	}

	next()
}
