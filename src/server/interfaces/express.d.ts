import { currentUserTokenInterface } from '@server/interfaces/analytics'

declare global {
  namespace Express {
    interface Request {
      currentUser: currentUserTokenInterface
    }
  }
}
