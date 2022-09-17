import { LinkService } from 'services/link.service'
import type { Link } from 'interfaces/link.interface'
import type { NextFunction, Request, RequestHandler, Response } from 'express'
import type { CustomResponse } from 'interfaces/response.interface'

export class LinkController {
  private linkService: LinkService

  constructor() {
    this.linkService = new LinkService()
  }

  public shorten: RequestHandler = async (req: Request, res: Response<CustomResponse<any>>, next: NextFunction) => {
    try {
      const { email } = req.auth
      const {
        alias,
        target,
        description,
        meta: { password, validFrom, validTill, maxVisits } = {
          password: null,
          validFrom: new Date(),
          validTill: null,
          maxVisits: null,
        },
      }: Link = req.body

      const link: Partial<Link> = { alias, target, description, meta: { password, validFrom, validTill, maxVisits } }

      const shortenedLink = await this.linkService.shorten(email, link)

      return res.json({ status: 'SUCCESS', message: null, data: shortenedLink })
    } catch (error) {
      next(error)
    }
  }

  public redirect: RequestHandler = async (req: Request, res: Response<CustomResponse<any>>, next: NextFunction) => {
    try {
      const { alias } = req.params

      const redirectionLink = await this.linkService.redirect(alias)

      return res.redirect(301, redirectionLink)
    } catch (error) {
      next(error)
    }
  }
}
