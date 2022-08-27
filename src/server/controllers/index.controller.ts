import type { NextFunction, Request, Response } from 'express'
import { LinkModel } from '~~/src/server/models/index.model'

export class IndexController {
  public index = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // const mongo = await connectDatabase()

      // const r = await mongo.db('links-db').collection('test').find()
      // res.status(200).json(r)

      const response = await LinkModel.find()
      res.status(200).json(response)
    } catch (error) {
      next(error)
    }
  }
}
