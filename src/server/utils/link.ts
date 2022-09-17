import { useConfig } from 'configs'

export const createShortLink = (alias: string) => {
  const config = useConfig()
  return `https://${config.domain}/${alias}`
}
