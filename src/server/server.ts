import 'dotenv/config'
import { AuthRoute } from 'server/modules/users/routes/auth.route'
import { LinkRoute } from 'server/modules/links/routes/link.route'
import { StatisticsRoute } from 'server/modules/statistics/routes/statistics.route'
import { UserRoute } from 'server/modules/users/routes/user.route'
import { App } from './app'

const app = new App([new AuthRoute(), new UserRoute(), new LinkRoute(), new StatisticsRoute()])

export default fromNodeMiddleware(app.getServer())
