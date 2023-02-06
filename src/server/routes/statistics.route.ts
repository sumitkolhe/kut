import { Router } from 'express'
import { checkAuthentication } from 'server/middlewares/auth.middleware'
import { StatisticsController } from 'server/controllers/statistics.controller'
import { statisticsVisitsSchema } from 'server/helpers/validator.helper'
import { checkEmailVerification } from 'server/middlewares/verifcation.middleware'
import type { Routes } from 'interfaces/routes.interface'

export class StatisticsRoute implements Routes {
  public path = '/stats'
  public router = Router()

  public statisticsController = new StatisticsController()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}/:alias/visits`,
      checkAuthentication,
      checkEmailVerification,
      statisticsVisitsSchema,
      this.statisticsController.visitStats
    )
    this.router.get(
      `${this.path}/:alias/device`,
      checkAuthentication,
      checkEmailVerification,
      statisticsVisitsSchema,
      this.statisticsController.deviceStats
    )
    this.router.get(
      `${this.path}/overview`,
      checkAuthentication,
      checkEmailVerification,
      this.statisticsController.overviewStats
    )
  }
}
