import { RequestHandler } from 'express'
import { Link } from 'src/interfaces/links'
import { LinkService } from 'src/services/link.service'

export const shortenLink: RequestHandler = async (req, res, next) => {
  try {
    const linkPayload: Link = req.body
    const shortLink = await LinkService.shortenLink(linkPayload)

    const responsePayload = {
      shortUrl: shortLink.shortUrl,
      longUrl: shortLink.longUrl,
      alias: shortLink.alias,
      createdAt: shortLink.createdAt,
    }
    res.json(responsePayload)
  } catch (error) {
    next(error)
  }
}
