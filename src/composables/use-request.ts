import { $fetch } from 'ohmyfetch'
import type { Token } from 'interfaces/token.interface'
import type { CustomResponse } from 'interfaces/response.interface'

export const useRequest = $fetch.create({
  baseURL: '/api',
  credentials: 'include',
  async onResponseError({ response }) {
    // Log error

    if (response.status === 401) {
      const refreshToken = useState('refreshToken')

      const response = await $fetch.raw<CustomResponse<Token>>('/api/auth/refresh-token', {
        method: 'POST',
        body: { refreshToken: refreshToken.value },
      })

      const accessToken = response._data?.data?.accessToken

      useState('accessToken').value = accessToken!
      useCookie('accessToken').value = accessToken!
    }
  },
})
