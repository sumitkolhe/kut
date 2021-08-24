import { globalConfig } from '@server/config/global'
import { generateUniqueAlias } from '@server/helpers/createAlias'
import { customAliasSchema, validateOriginalLink } from '@server/helpers/validators'
import { CreateError } from '@server/middleware/errorHandler'
import { LinkModel } from '@server/models/link.model'
import { UserModel } from '@server/models/user.model'
import { Logger } from '@server/utils/logger'
import { linkDetailsInterface } from '@server/interfaces/links'

export const createShortLink = async (payload: linkDetailsInterface): Promise<linkDetailsInterface> => {
  try {
    const validateAlias = await customAliasSchema.validateAsync({ alias: payload.alias })
    Logger.info(validateAlias)
    const uniqueAlias = validateAlias.alias ? validateAlias.alias : await generateUniqueAlias()

    const newLink = new LinkModel({
      alias: uniqueAlias,
      shortUrl: `https://${globalConfig.WEBSITE_DOMAIN}/${uniqueAlias}`,
      longUrl: validateOriginalLink(payload.longUrl),
      description: payload.description,
      passwordProtected: !!payload.password,
      password: payload.password,
    })

    const savedLink = await newLink.save()

    return savedLink
  } catch (error) {
    if (error.isJoi === true) throw CreateError.BadRequest(error.message)
    throw CreateError.BadRequest(`Custom link is already in use`)
  }
}

export const updateUserLinks = async (email: string, newLink: linkDetailsInterface): Promise<void> => {
  try {
    const userInstance = await UserModel.findOne({ email })
    await userInstance.userLinks.push(newLink)
    await userInstance.save()
  } catch (error) {
    throw CreateError.BadRequest(error)
  }
}
