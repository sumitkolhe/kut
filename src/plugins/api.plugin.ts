import { ApiService } from 'services/api.service'

export default defineNuxtPlugin(() => {
  const {
    public: { apiBaseUrl },
  } = useRuntimeConfig()

  return {
    provide: { apiService: new ApiService(apiBaseUrl) },
  }
})
