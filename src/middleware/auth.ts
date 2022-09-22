import { useJwt } from '@vueuse/integrations/useJwt'
import { useAuthStore } from 'store/auth.store'

export default defineNuxtRouteMiddleware(async () => {
  const { refreshToken } = useAuthStore()

  const { accessToken } = useToken()

  if (!accessToken.value) return navigateTo('/login')

  // if access token is found, decode it and check expiry
  const { payload } = useJwt(accessToken.value)

  // if token expired, redirect to login page
  if (payload.value!.exp! < Date.now() / 1000) {
    return await refreshToken()
  }

  return
})
