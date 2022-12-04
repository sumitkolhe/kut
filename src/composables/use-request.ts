import { $fetch } from 'ohmyfetch'

export const useRequest = $fetch.create({
  baseURL: '/api/v1',
  credentials: 'include',
  async onResponseError({ response }) {
    if (response.status === 401 && response._data.message === 'jwt expired') {
      //
    } else if (response.status >= 400) {
      createToast(response?._data.message, { type: 'error' })
    }
  },
})
