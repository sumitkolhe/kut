import { Router } from 'express'
import { checkAuthentication } from 'server/common/middlewares/auth.middleware'
import { checkEmailVerification } from 'server/common/middlewares/verifcation.middleware'
import { StatisticsController } from 'server/modules/statistics/controllers/statistics.controller'
import { statisticsVisitsSchema } from 'server/common/helpers/validator.helper'
import type { Routes } from 'server/common/types/routes.interface'

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
