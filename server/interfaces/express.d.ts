import { CurrentUser } from '@server/interfaces/user'
declare global {
  namespace Express {
    interface Request {
      currentUser: CurrentUser
    }
  }
}
