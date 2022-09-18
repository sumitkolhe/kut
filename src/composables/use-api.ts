import { $fetch } from 'ohmyfetch'

const baseURL = process.env.NODE_ENV !== 'production' ? 'http://localhost:3000/api' : 'https://trym.in/api'

export const useApi = $fetch.create({
  baseURL,
  async onRequest({ options }) {
    if (typeof window === 'undefined' || !window.localStorage) return
    const token = localStorage.getItem('trym.access_token')

    if (token) {
      options.headers = { Authorization: `Bearer ${token}` }
    }
  },
})
