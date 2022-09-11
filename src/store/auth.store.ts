import { defineStore } from 'pinia'
import { useAxios } from 'composables/axios'
import type { CustomResponse } from 'interfaces/response.interface'
import type { Tokens } from 'interfaces/token.interface'

export const useAuthStore = defineStore('authentication', {
  state: () => ({}),
  actions: {
    async login(email: string, password: string) {
      try {
        const response = await useAxios.post<CustomResponse<Tokens>>('/auth/login', { email, password })

        localStorage.setItem('trym.access_token', response.data.data!.accessToken)
      } catch (error) {
        if (error instanceof Error) console.error(error.message)
      }
    },
  },
})
