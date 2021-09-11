import { currentUserTokenInterface } from '@server/interfaces/user'
declare global {
  namespace Express {
    interface Request {
      currentUser: currentUserTokenInterface
    }
  }
}
