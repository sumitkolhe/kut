import { $fetch } from 'ohmyfetch'

export const useRequest = $fetch.create({
  baseURL: '/api',
  credentials: 'include',
  async onResponseError({ response }) {
    if (response.status === 401 && response._data.message === 'jwt expired') {
      const { $auth } = useNuxtApp()

      await $auth.refreshToken()
    } else if (response.status >= 400) {
      createToast(response?._data.message, { type: 'error' })
    }
  },
})
