// import { customAliasSchema, validateOriginalLink } from '@server/helpers/validators'
import { CreateError } from '@server/middleware/errorHandler'
import { UserModel } from '@server/models/user.model'

export const createShortLink = async (): Promise<void> => {
  try {
    // const validateAlias = await customAliasSchema.validateAsync({ alias: payload.alias })
    // Logger.info(validateAlias)
    // const uniqueAlias = validateAlias.alias ? validateAlias.alias : await generateUniqueAlias()
    // const newLink = new LinkModel({
    //   alias: uniqueAlias,
    //   shortUrl: `https://${globalConfig.WEBSITE_DOMAIN}/${uniqueAlias}`,
    //   longUrl: validateOriginalLink(payload.longUrl),
    //   description: payload.description,
    //   passwordProtected: !!payload.password,
    //   password: payload.password,
    // })
    // const savedLink = await newLink.save()
    // return savedLink
  } catch (error) {
    if (error.isJoi === true) throw CreateError.BadRequest(error.message)
    throw CreateError.BadRequest(`Custom link is already in use`)
  }
}

export const updateUserLinks = async (email: string): Promise<void> => {
  try {
    const userInstance = await UserModel.findOne({ email })
    // await userInstance.userLinks.push(newLink)
    await userInstance.save()
  } catch (error) {
    throw CreateError.BadRequest(error)
  }
}
