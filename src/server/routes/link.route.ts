import { Router } from 'express'
import { LinkController } from 'server/controllers/link.controller'
import { checkAuthentication } from 'server/middlewares/auth.middleware'
import { allLinksSchema } from 'server/helpers/validator.helper'
import { StatisticsController } from 'server/controllers/statistics.controller'
import { statisticsHandler } from 'server/middlewares/statistics.middleware'
import type { Routes } from 'interfaces/routes.interface'

export class LinkRoute implements Routes {
  public path = '/links'
  public router = Router()
  public linkController = new LinkController()
  public statisticsController = new StatisticsController()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}`,
      checkAuthentication,
      allLinksSchema,
      this.linkController.getAllLinks
    )
    this.router.post(`${this.path}/shorten`, checkAuthentication, this.linkController.createLink)
    this.router.get(
      `${this.path}/redirect/:alias`,
      statisticsHandler,
      this.linkController.redirectLink
    )
    this.router.get(`${this.path}/:alias`, checkAuthentication, this.linkController.getLink)
    this.router.put(`${this.path}/:alias`, checkAuthentication, this.linkController.updateLink)
    this.router.delete(`${this.path}/:alias`, checkAuthentication, this.linkController.deleteLink)
    this.router.get(
      `${this.path}/stats/:alias`,
      checkAuthentication,
      this.statisticsController.visitStats
    )
  }
}
