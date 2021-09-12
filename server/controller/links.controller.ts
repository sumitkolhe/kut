import { RequestHandler } from 'express'
import { Link } from '@server/interfaces/links'
import { LinkService } from '@server/services/link.service'

export const shortenLink: RequestHandler = async (req, res, next) => {
  try {
    const linkPayload: Link = req.body

    await LinkService.shortenLink(linkPayload)
  } catch (error) {
    next(error)
  }
}
