import { useJwt } from '@vueuse/integrations/useJwt'
import { useAuthStore } from 'store/auth.store'

export default defineNuxtRouteMiddleware(async () => {
  const { logout, refreshToken } = useAuthStore()
  const cookie = useState<string>('accessToken')

  if (!cookie.value) return await logout()

  // if access token is found, decode it and check expiry
  const { payload } = useJwt(cookie.value)

  // if token expired, redirect to login page
  if (payload.value!.exp! < Date.now() / 1000) {
    return await refreshToken()
  }

  return
})
