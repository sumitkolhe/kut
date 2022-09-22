import { defineStore } from 'pinia'
import { FetchError } from 'ohmyfetch'
import type { Token, Tokens } from 'interfaces/token.interface'
import type { User } from 'interfaces/user.interface'
import type { CustomResponse } from 'interfaces/response.interface'

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

        const response = await useRequest<CustomResponse<Tokens>>('/auth/login', {
          body: { email, password },
          method: 'POST',
        })

        useState('accessToken').value = response.data?.accessToken
        useState('refreshToken').value = response.data?.refreshToken

        createToast('Login successful. Redirecting...', { type: 'success' })

        setTimeout(() => {
          router.push('/')
        }, 2000)
      } catch (error) {
        if (error instanceof FetchError) {
          createToast(error.response?._data.message, { type: 'error' })
        }
      }
    },

    async fetchUser() {
      try {
        const response = await useRequest<CustomResponse<User>>('/auth/me', {
          method: 'GET',
        })

        this.user = response.data!
      } catch (error) {
        if (error instanceof FetchError) {
          createToast(error.response?._data.message, { type: 'error' })
        }
      }
    },

    async logout() {
      try {
        const router = useRouter()

        await useRequest<CustomResponse<null>>('/auth/logout', {
          method: 'GET',
        })

        router.push('/login')
      } catch (error) {
        if (error instanceof Error) {
          createToast(error.message, { type: 'error' })
        }
      }
    },

    async refreshToken() {
      try {
        const refreshToken = useState('refreshToken')

        const response = await $fetch.raw<CustomResponse<Token>>('/api/auth/refresh-token', {
          method: 'POST',
          body: { refreshToken: refreshToken.value },
        })

        const { accessToken } = useToken()

        accessToken.value = response._data!.data!.accessToken!
      } catch {
        await this.logout()
      }
    },
  },
})
