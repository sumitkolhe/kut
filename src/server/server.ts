import 'dotenv/config'
import { AuthRoute } from 'routes/auth.route'
import { App } from './app'

const app = new App([new AuthRoute()])

export default app.getServer()
