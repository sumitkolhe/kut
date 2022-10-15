import { useConfig } from 'server/configs'

export const createShortLink = (alias: string) => {
  const config = useConfig()
  return `${config.domain.protocol}://${config.domain.url}/${alias}`
}
