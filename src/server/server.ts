import 'dotenv/config'
import { AuthRoute } from 'server/routes/auth.route'
import { LinkRoute } from 'server/routes/link.route'
import { App } from './app'

const app = new App([new AuthRoute(), new LinkRoute()])

export default app.getServer()
