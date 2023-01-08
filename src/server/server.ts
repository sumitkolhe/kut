import 'dotenv/config'
import { AuthRoute } from 'server/routes/auth.route'
import { LinkRoute } from 'server/routes/link.route'
import { StatisticsRoute } from 'server/routes/statistics.route'
import { App } from './app'

const app = new App([new AuthRoute(), new LinkRoute(), new StatisticsRoute()])

export default fromNodeMiddleware(app.getServer())
