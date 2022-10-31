import { useConfig } from 'server/configs'
import { HttpExceptionError } from '~~/src/server/exceptions/http.exception'

export const createShortLink = (alias: string) => {
  const config = useConfig()
  return `${config.domain.protocol}://${config.domain.url}/${alias}`
}

export const verifyTargetLink = (target: string) => {
  const link = target.trim()
  const linkWithProtocol =
    /(https?|ftp|file):\/\/(www\.)?[\w#%+.:=@~-]{1,256}\.[\d()A-Za-z]{1,6}\b([\w#%&()+./:=?@~-]*)/

  const link_without_protocol = /[\w#%+.:=@~-]{1,256}\.[\d()A-Za-z]{1,6}\b([\w#%&()+./:=?@~-]*)/

  //valid URL including http/https and domain
  if (linkWithProtocol.test(link)) return link
  //valid URL but http/https protocol not present
  else if (link_without_protocol.test(link)) return `https://${link}`
  //Invalid Url
  else throw new HttpExceptionError(400, 'Invalid target link')
}
