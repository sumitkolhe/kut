import { UserModel } from '@model/user.model'
import { RequestHandler } from 'express'

export const links: RequestHandler = async (req, res, next) => {
  try {
    await UserModel.findOne({ email: req.body.auth.email })
      .populate('userLinks')
      .then((link:any) => {
        res.json(link?.userLinks)
      })
  } catch (error) {
    next(error)
  }
}
