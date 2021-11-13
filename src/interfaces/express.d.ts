import { CurrentUser } from 'src/interfaces/user'
declare global {
  namespace Express {
    interface Request {
      currentUser: CurrentUser
    }
  }
}
