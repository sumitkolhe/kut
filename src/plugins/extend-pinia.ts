import { AuthService } from 'services/auth.service'
import { LinkService } from 'services/link.service'
import { StatisticsService } from 'services/statistics.service'
import type { PiniaPluginContext } from 'pinia'

function HttpServicePlugin({ store }: PiniaPluginContext) {
  store.$http = {
    auth: markRaw(new AuthService()),
    link: markRaw(new LinkService()),
    statistics: markRaw(new StatisticsService()),
  }
}

export default defineNuxtPlugin(({ $pinia }) => {
  $pinia.use(HttpServicePlugin)
})
