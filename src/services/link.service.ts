import { CreateError } from 'src/middleware/errorHandler'
import { Link } from 'src/interfaces/links'
import { generateUniqueAlias } from 'src/helpers/createAlias'
import { globalConfig } from 'src/config/global'
import { LinkModel } from 'src/models/link.model'

export class LinkService {
  static shortenLink = async (linkPayload: Link): Promise<Link> => {
    const uniqueAlias = linkPayload.alias ? linkPayload.alias : await generateUniqueAlias()

    const newLink = new LinkModel({
      alias: uniqueAlias,
      shortUrl: `${globalConfig.websiteDomain}/${uniqueAlias}`,
      longUrl: linkPayload.longUrl,
      description: linkPayload.description,
      passwordProtected: linkPayload.password ? true : false,
      password: linkPayload.password,
    })

    const savedLink: Link = await newLink.save().catch(() => {
      throw CreateError.BadRequest('Alias is already in use')
    })
    return savedLink
  }
}
