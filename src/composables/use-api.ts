import { $fetch } from 'ohmyfetch'

export const useApi = $fetch.create({ baseURL: '/api', credentials: 'include' })
