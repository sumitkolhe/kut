import 'dotenv/config'
import { AuthRoute } from 'server/common/routes/auth.route'
import { LinkRoute } from 'server/common/routes/link.route'
import { StatisticsRoute } from 'server/common/routes/statistics.route'
import { App } from './app'

const app = new App([new AuthRoute(), new LinkRoute(), new StatisticsRoute()])

export default fromNodeMiddleware(app.getServer())
