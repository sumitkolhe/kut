import 'dotenv/config'
import { IndexRoute } from './routes/index.route'
import { App } from './app'

const app = new App([new IndexRoute()])

export default app.getServer()
