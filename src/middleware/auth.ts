import { useJwt } from '@vueuse/integrations/useJwt'
import { useAuthStore } from 'store/auth.store'
import type { User } from 'interfaces/user.interface'
import type { CustomResponse } from 'interfaces/response.interface'

export default defineNuxtRouteMiddleware(async () => {
  const route = useRoute()
  const { apiBaseUrl } = useRuntimeConfig()
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
  }

  try {
    if (!AuthStore?.user?.email) {
      const user = await $fetch<CustomResponse<User>>('/api/v1/auth/me', {
        baseURL: apiBaseUrl,
        headers: {
          Cookie: `accessToken=${accessToken.value}`,
        },
      })
      AuthStore.user = user.data!
    }
  } catch (error) {
    if (error instanceof Error) logger.error(error.message)
  }

  if (AuthStore?.user?.isVerified === false && !route.path.includes('dashboard/verify'))
    return navigateTo('/dashboard/verify')
})
