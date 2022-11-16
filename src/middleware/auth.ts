import { useJwt } from '@vueuse/integrations/useJwt'
import { useAuthStore } from 'store/auth.store'

export default defineNuxtRouteMiddleware(async () => {
  const router = useRouter()
  const AuthStore = useAuthStore()
  const { accessToken, refreshToken } = useToken()

  // if access token is not present, logout the user
  if (!accessToken.value) {
    return navigateTo('/')
  }

  // decode the token to get expiry and refresh it if token already expired
  const { payload } = useJwt(accessToken.value)

  if (payload.value && payload.value.exp! < Date.now() / 1000) {
    await AuthStore.refreshToken(refreshToken.value!)
    return
  }

  // fetch user data if not already present
  if (!AuthStore?.user?.email) {
    await AuthStore.fetchUser().catch(() => router.replace('/'))
  }

  if (AuthStore?.user?.isVerified === false) return navigateTo('/auth/verify-email')
})
