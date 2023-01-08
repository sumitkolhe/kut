import { Router } from 'express'
import { checkAuthentication } from 'server/middlewares/auth.middleware'
import { StatisticsController } from 'server/controllers/statistics.controller'
import { statisticsVisitsSchema } from 'server/helpers/validator.helper'
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
      statisticsVisitsSchema,
      this.statisticsController.visitStats
    )
  }
}
