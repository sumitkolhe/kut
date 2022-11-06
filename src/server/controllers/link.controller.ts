import { LinkService } from 'server/services/link.service'
import type { Link } from 'interfaces/link.interface'
import type { NextFunction, Request, RequestHandler, Response } from 'express'
import type { CustomResponse } from 'interfaces/response.interface'

export class LinkController {
  private linkService: LinkService

  constructor() {
    this.linkService = new LinkService()
  }

  public shorten: RequestHandler = async (
    req: Request,
    res: Response<CustomResponse<any>>,
    next: NextFunction
  ) => {
    try {
      const { email } = req.auth
      const {
        alias,
        target,
        description,
        meta: { password, validFrom, validTill, maxVisits, active } = {
          password: null,
          validFrom: new Date(),
          validTill: null,
          maxVisits: null,
          active: true,
        },
      }: Link = req.body

      const link: Partial<Link> = {
        alias,
        target,
        description,
        meta: { password, validFrom, validTill, maxVisits, active },
      }

      const shortenedLink = await this.linkService.shorten(email, link)

      return res.json({ status: 'SUCCESS', message: null, data: shortenedLink })
    } catch (error) {
      next(error)
    }
  }

  public allLinks: RequestHandler = async (
    req: Request,
    res: Response<
      CustomResponse<{
        links: Link[]
        total: number
      }>
    >,
    next: NextFunction
  ) => {
    try {
      const { email } = req.auth
      const { offset, limit } = req.query

      const shortenedLink = await this.linkService.getAllLinks(email, Number(offset), Number(limit))

      return res.json({ status: 'SUCCESS', message: null, data: shortenedLink })
    } catch (error) {
      next(error)
    }
  }

  public redirect: RequestHandler = async (
    req: Request,
    res: Response<CustomResponse<any>>,
    next: NextFunction
  ) => {
    try {
      const { alias } = req.params
      const { analytics } = req

      const redirectionLink = await this.linkService.redirect(alias, analytics)

      return res.json({
        status: 'SUCCESS',
        message: null,
        data: redirectionLink,
      })
    } catch (error) {
      next(error)
    }
  }
}
