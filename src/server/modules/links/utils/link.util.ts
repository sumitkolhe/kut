import { useConfig } from 'server/common/configs'
import { HttpExceptionError } from 'server/common/exceptions/http.exception'

const config = useConfig()

export const generateShortLink = (alias: string) => {
  return `${config.domain.protocol}://${config.domain.url}/${alias}`
}

export const sanitizeTargetLink = (target: string) => {
  const link = target.trim()
  const linkWithProtocol =
    /^(https?|ftp|file):\/\/(www\.)?[\w#%+.:=@~-]{1,256}\.[\d()A-Za-z]{1,6}\b([\w#%&()+./:=?@~-]*)/
  const linkWithoutProtocol = /^[\w#%+.:=@~-]{1,256}\.[\d()A-Za-z]{1,6}\b([\w#%&()+./:=?@~-]*)/

  // valid URL including http/https and domain
  if (linkWithProtocol.test(link)) {
    return link
    // valid URL but http/https protocol not present
  } else if (linkWithoutProtocol.test(link)) {
    return `https://${link}`
  } else {
    // Invalid Url
    throw new HttpExceptionError(400, 'Invalid target link')
  }
}
