import 'dotenv/config'
import { StatisticsRoute } from 'server/modules/statistics/routes/statistics.route'
import { AuthRoute } from 'server/modules/auth/routes/auth.route'
import { LinkRoute } from 'server/modules/links/routes/link.route'
import { App } from './app'

const app = new App([new AuthRoute(), new LinkRoute(), new StatisticsRoute()])

export default fromNodeMiddleware(app.getServer())
