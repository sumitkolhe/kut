import { LinkService } from 'server/services/link.service'
import type { Link } from 'interfaces/link.interface'
import type { NextFunction, Request, RequestHandler, Response } from 'express'
import type { CustomResponse } from 'interfaces/response.interface'

export class LinkController {
  private linkService: LinkService

  constructor() {
    this.linkService = new LinkService()
  }

  public createLink: RequestHandler = async (
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

      const shortenedLink = await this.linkService.createLink(email, link)

      return res.json({ status: 'SUCCESS', message: null, data: shortenedLink })
    } catch (error) {
      next(error)
    }
  }

  public getAllLinks: RequestHandler = async (
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
      const { offset, limit, search } = req.query

      const shortenedLink = await this.linkService.getAllLinks(
        email,
        Number(offset),
        Number(limit),
        search as string
      )

      return res.json({ status: 'SUCCESS', message: null, data: shortenedLink })
    } catch (error) {
      next(error)
    }
  }

  public deleteLink: RequestHandler = async (
    req: Request,
    res: Response<CustomResponse<null>>,
    next: NextFunction
  ) => {
    try {
      const { email } = req.auth
      const { alias } = req.params

      await this.linkService.deleteLink(email, alias)

      return res.json({ status: 'SUCCESS', message: 'link deleted successfully', data: null })
    } catch (error) {
      next(error)
    }
  }

  public getLink: RequestHandler = async (
    req: Request,
    res: Response<CustomResponse<any>>,
    next: NextFunction
  ) => {
    try {
      const { alias } = req.params
      const { analytics } = req

      const link = await this.linkService.getLinkByAlias(alias, analytics)

      return res.json({
        status: 'SUCCESS',
        message: null,
        data: link,
      })
    } catch (error) {
      next(error)
    }
  }

  public linkStatistics: RequestHandler = async (
    req: Request,
    res: Response<CustomResponse<any>>,
    next: NextFunction
  ) => {
    try {
      const { alias } = req.params

      const statistics = await this.linkService.statistics(alias)

      return res.json({
        status: 'SUCCESS',
        message: null,
        data: statistics,
      })
    } catch (error) {
      next(error)
    }
  }
}
