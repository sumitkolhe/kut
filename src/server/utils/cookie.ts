export const getCookies = function (rawCookie: string | undefined): Record<string, string> {
  const cookies: Record<string, string> = {}
  rawCookie &&
    rawCookie.split(';').forEach((cookie: string) => {
      const parts: RegExpMatchArray | null = cookie.match(/(.*?)=(.*)$/)
      if (parts && parts.length > 0) {
        cookies[parts[1].trim()] = (parts[2] || '').trim()
      }
    })
  return cookies
}
