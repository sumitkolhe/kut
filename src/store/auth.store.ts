import { defineStore } from 'pinia'
import { useAxios } from 'composables/axios'
import { AxiosError } from 'axios'
import type { User } from 'interfaces/user.interface'
import type { CustomResponse } from 'interfaces/response.interface'
import type { Tokens } from 'interfaces/token.interface'

export const useAuthStore = defineStore('authentication', {
  state: () => ({
    user: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      apiKey: '',
      isBanned: false,
      isVerified: false,
      userLinks: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    } as User,
  }),
  actions: {
    async login(email: string, password: string) {
      try {
        const router = useRouter()

        const response = await useAxios.post<CustomResponse<Tokens>>('/auth/login', { email, password })

        localStorage.setItem('trym.access_token', response.data.data!.accessToken)

        createToast('Login successful. Redirecting...', { type: 'success' })

        setTimeout(() => {
          router.push('/')
        }, 2000)
      } catch (error) {
        if (error instanceof AxiosError) {
          createToast(error.response?.data.message, { type: 'error' })
        }
      }
    },

    async fetchUser() {
      try {
        const response = await useAxios.get<CustomResponse<User>>('/auth/me')

        this.user = response.data.data!
      } catch (error) {
        if (error instanceof AxiosError) {
          createToast(error.response?.data.message, { type: 'error' })
        }
      }
    },

    async logout() {
      try {
        const router = useRouter()

        localStorage.clear()

        return router.push('/login')
      } catch (error) {
        if (error instanceof Error) {
          createToast(error.message, { type: 'error' })
        }
      }
    },
  },
})
