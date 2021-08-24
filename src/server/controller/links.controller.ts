import { RequestHandler } from 'express'
import { linkDetailsInterface } from '@server/interfaces/links'
import { createShortLink, updateUserLinks } from '@server/services/links/shorten'

export const shortenLink: RequestHandler = async (req, res, next) => {
  try {
    const payload = req.body as linkDetailsInterface

    const savedLink = await createShortLink(payload)

    await updateUserLinks(req.currentUser.email, savedLink)

    res.status(201).json({
      alias: savedLink.alias,
      shortUrl: savedLink.shortUrl,
      longUrl: savedLink.longUrl,
      createdAt: savedLink.createdAt,
    })
  } catch (error) {
    next(error)
  }
}
