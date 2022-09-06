import { logger } from 'utils/logger'
import type { NextFunction, Request, Response } from 'express'
import type { HttpExceptionError } from 'exceptions/http.exception'

export const errorMiddleware = (error: HttpExceptionError, req: Request, res: Response, next: NextFunction) => {
  try {
    const status: number = error.status || 500
    const message: string = error.message || 'Something went wrong'

    logger.error(`[${req.method}] ${req.path} >> status code:: ${status}, message:: ${message}`)

    res.status(status).json({
      status: 'FAILED',
      message,
      data: null,
    })
  } catch (error) {
    next(error)
  }
}
