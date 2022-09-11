import axios from 'axios'

export const useAxios = axios.create({
  baseURL: '/api',
})

useAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem('trym.access_token')

  if (token) {
    config!.headers!.Authorization = `Bearer ${token}`
  }
  return config
})
