import { $fetch } from 'ohmyfetch'

const baseURL = process.env.NODE_ENV !== 'production' ? 'http://localhost:3000/api' : 'https://trym.in/api'

export const useApi = $fetch.create({ baseURL, credentials: 'include' })
