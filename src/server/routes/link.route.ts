import { Router } from 'express'
import { LinkController } from 'server/controllers/link.controller'
import { checkAuthentication } from 'server/middlewares/auth.middleware'
import { analyticsHandler } from 'server/middlewares/analytics.middleware'
import { allLinksSchema } from 'server/helpers/validator.helper'
import type { Routes } from 'interfaces/routes.interface'

export class LinkRoute implements Routes {
  public path = '/links'
  public router = Router()
  public linkController = new LinkController()

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
      `${this.path}/stats/:alias`,
      checkAuthentication,
      this.linkController.linkStatistics
    )
    this.router.get(`${this.path}/:alias`, analyticsHandler, this.linkController.getLink)
    this.router.delete(`${this.path}/:alias`, checkAuthentication, this.linkController.deleteLink)
  }
}
