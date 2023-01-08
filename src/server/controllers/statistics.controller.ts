import { StatisticsService } from 'server/services/statistics.service'
import type { NextFunction, Request, RequestHandler, Response } from 'express'
import type { CustomResponse } from 'interfaces/response.interface'

export class StatisticsController {
  private statisticsService: StatisticsService

  constructor() {
    this.statisticsService = new StatisticsService()
  }

  public visitStats: RequestHandler = async (
    req: Request,
    res: Response<CustomResponse<any>>,
    next: NextFunction
  ) => {
    try {
      const { alias } = req.params

      const visitStats = await this.statisticsService.getVisitStats(alias)

      return res.json({ status: 'SUCCESS', message: null, data: visitStats })
    } catch (error) {
      next(error)
    }
  }
}
