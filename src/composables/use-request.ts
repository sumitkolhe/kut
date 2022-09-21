import { $fetch } from 'ohmyfetch'
import { useAuthStore } from 'store/auth.store'

export const useRequest = $fetch.create({
  baseURL: '/api',
  credentials: 'include',
  async onResponseError({ response }) {
    if (response.status === 401) {
      const { refreshToken } = useAuthStore()

      await refreshToken()
    }
  },
})
