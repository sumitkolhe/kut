import { AuthService } from 'services/auth.service'
import { LinkService } from 'services/link.service'
import type { PiniaPluginContext } from 'pinia'

// add query and mutation service in pinia stores as plugins
function HttpServicePlugin({ store }: PiniaPluginContext) {
  store.$http = {
    auth: markRaw(new AuthService()),
    link: markRaw(new LinkService()),
  }
}

export default defineNuxtPlugin(({ $pinia }) => {
  $pinia.use(HttpServicePlugin)
})
