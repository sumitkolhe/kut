import { useJwt } from '@vueuse/integrations/useJwt'
import { storeToRefs } from 'pinia'
import { useAuthStore } from 'store/auth.store'

export default defineNuxtRouteMiddleware(async (to) => {
  if (to && to.meta.auth && to.meta.auth === 'guest') return

  const { logout } = useAuthStore()
  const { accessToken } = storeToRefs(useAuthStore())

  // if access token is not present, logout the user
  if (!accessToken.value) return navigateTo('/')

  // decode the token to get expiration time. if token is expired, logout.
  const { payload } = useJwt(accessToken.value)

  if (payload.value && payload.value.exp! < Date.now() / 1000) return logout()
})
