import { Router } from 'express'
import { checkAuthentication } from 'server/common/middlewares/auth.middleware'
import { statisticsHandler } from 'server/common/middlewares/statistics.middleware'
import { checkEmailVerification } from 'server/common/middlewares/verifcation.middleware'
import { StatisticsController } from 'server/modules/statistics/controllers/statistics.controller'
import { allLinksSchema } from 'server/common/helpers/validator.helper'
import { LinkController } from 'server/modules/links/controllers/link.controller'
import { createLinkSchema } from 'server/modules/links/helpers/validation.helper'
import type { Routes } from 'server/common/types/routes.interface'

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
      checkEmailVerification,
      allLinksSchema,
      this.linkController.getLinks
    )
    this.router.post(
      `${this.path}/shorten`,
      checkAuthentication,
      checkEmailVerification,
      createLinkSchema,
      this.linkController.createLink
    )
    this.router.post(
      `${this.path}/redirect/:alias`,
      statisticsHandler,
      this.linkController.redirectLink
    )
    this.router.get(
      `${this.path}/:alias`,
      checkAuthentication,
      checkEmailVerification,
      this.linkController.getLink
    )
    this.router.put(
      `${this.path}/:alias`,
      checkAuthentication,
      checkEmailVerification,
      this.linkController.updateLink
    )
    this.router.delete(
      `${this.path}/:alias`,
      checkAuthentication,
      checkEmailVerification,
      this.linkController.deleteLink
    )
  }
}
