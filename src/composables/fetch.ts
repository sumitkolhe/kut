import { $fetch } from 'ohmyfetch'

export const useApi = $fetch.create({
  baseURL: '/api',
  async onRequest({ options }) {
    const token = localStorage.getItem('trym.access_token')

    if (token) {
      options.headers = { Authorization: `Bearer ${token}` }
    }
  },
})
