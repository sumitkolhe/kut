export const userAgent = (req: any, _res: any, next: () => void) => {
  req.user_agent = {
    os: req.user_agent.os,
    mobile: req.user_agent.isMobile,
    tablet: req.user_agent.isTablet,
    desktop: req.user_agent.isDesktop,
    browser: req.user_agent.browser,
    version: req.user_agent.version,
    platform: req.user_agent.platform,
    location: req.user_agent.geoIp,
    source: req.user_agent.source,
  };

  next();
};
