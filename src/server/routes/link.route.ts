import { Router } from 'express'
import { LinkController } from 'server/controllers/link.controller'
import { checkAuthentication } from 'server/middlewares/auth.middleware'
import { analyticsHandler } from 'server/middlewares/analytics.middleware'
import type { Routes } from 'interfaces/routes.interface'

export class LinkRoute implements Routes {
  public path = '/link'
  public router = Router()
  public linkController = new LinkController()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, checkAuthentication, this.linkController.allLinks)
    this.router.post(`${this.path}/shorten`, checkAuthentication, this.linkController.shorten)
    this.router.get(`${this.path}/:alias`, analyticsHandler, this.linkController.redirect)
  }
}
