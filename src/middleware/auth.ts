import { useJwt } from '@vueuse/integrations/useJwt'
import { useAuthStore } from 'store/auth.store'

export default defineNuxtRouteMiddleware(async () => {
  const { logout } = useAuthStore()
  const { accessToken } = useToken()

  console.log(accessToken.value)

  // if access token is not present, logout the user
  if (!accessToken.value) {
    return navigateTo('/')
  }

  // decode the token to get expiration time. if token is expired, logout.
  const { payload } = useJwt(accessToken.value)

  if (payload.value && payload.value.exp! < Date.now() / 1000) {
    await logout()
    return navigateTo('/auth/login')
  }
})
