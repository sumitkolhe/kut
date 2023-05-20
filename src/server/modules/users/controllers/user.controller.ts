import { UserService } from 'server/modules/users/services/user.service'
import { ObjectId } from 'mongodb'
import type { User } from 'interfaces/user.interface'
import type { NextFunction, Request, RequestHandler, Response } from 'express'
import type { CustomResponse } from 'interfaces/response.interface'

export class UserController {
  private readonly userService: UserService
  constructor() {
    this.userService = new UserService()
  }

  public me: RequestHandler = async (
    req: Request,
    res: Response<CustomResponse<User>>,
    next: NextFunction
  ) => {
    try {
      const { userId } = req.auth

      const userDetails = await this.userService.me(new ObjectId(userId))

      return res.json({ status: 'SUCCESS', message: null, data: userDetails })
    } catch (error) {
      next(error)
    }
  }
}
