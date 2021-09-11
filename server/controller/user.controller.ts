import { RequestHandler } from 'express'
import { UserService } from '@server/services/user.service'

export const userInfo: RequestHandler = async (req, res, next) => {
  try {
    const { email } = req.currentUser
    const userDetails = await UserService.userInfo(email)
    res.json({
      name: userDetails?.name,
      email: userDetails?.email,
      isVerified: userDetails?.isVerified,
      createdAt: userDetails?.createdAt,
      updatedAt: userDetails?.updatedAt,
      isBanned: userDetails?.isBanned,
    })
  } catch (error) {
    next(error)
  }
}
