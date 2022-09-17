import { Router } from 'express'
import { LinkController } from 'controllers/link.controller'
import { checkAuthentication } from 'middlewares/auth.middleware'
import type { Routes } from 'interfaces/routes.interface'

export class LinkRoute implements Routes {
  public path = '/link'
  public router = Router()
  public linkController = new LinkController()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/shorten`, checkAuthentication, this.linkController.shorten)
  }
}
