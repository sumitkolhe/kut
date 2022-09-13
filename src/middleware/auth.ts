import { useJwt } from '@vueuse/integrations/useJwt'
import { useAuthStore } from 'store/auth.store'

export default defineNuxtRouteMiddleware(() => {
  const AuthStore = useAuthStore()

  // if not server, localStorage is not accessible so return
  if (!process.client) return

  // get access token from localStorage
  const encodedJwt = localStorage.getItem('trym.access_token')

  // if no access token found, redirect user to login page
  if (!encodedJwt) return AuthStore.logout()

  // if access token is found, decode it and check expiry
  const { payload } = useJwt(encodedJwt)

  // if token expired, redirect to login page
  if (payload.value!.exp! < Date.now() / 1000) return AuthStore.logout()

  return
})
