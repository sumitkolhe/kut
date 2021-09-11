import { globalConfig } from '@server/config/global'
import { LinkModel } from '@server/models/link.model'

export const generateUniqueAlias = async (): Promise<string> => {
  try {
    const characterSet = 'abcdefghijklmnopqrstuvwxyz1234567890'
    let randomAlias = ''

    for (let i = 0; i < globalConfig.aliasLength; i += 1) {
      randomAlias += characterSet.charAt(Math.floor(Math.random() * characterSet.length))
    }
    const isAliasAvailable = await LinkModel.findOne({ alias: randomAlias })

    return isAliasAvailable ? await generateUniqueAlias() : randomAlias
  } catch (error) {
    return error
  }
}
