import { defineStore } from 'pinia'
import { logger } from 'utils/logger'
import type { User } from 'interfaces/user.interface'

interface State {
  user: Omit<User, 'apiKey' | 'userLinks'> | null
  accessToken: string | null
}

export const useAuthStore = defineStore('authentication-store', {
  state: (): State => ({
    user: null,
    accessToken: null,
  }),
  actions: {
    async loginUser(email: string, password: string) {
      try {
        const { data } = await this.$http.auth.login(email, password)

        if (data?.accessToken) this.accessToken = data.accessToken

        return { error: null }
      } catch (error) {
        if (error instanceof Error) logger.error(error.message)
        return { error }
      }
    },

    async registerUser(email: string, password: string) {
      try {
        await this.$http.auth.register(email, password)
      } catch (error) {
        if (error instanceof Error) logger.error(error.message)
      }
    },

    async fetchUser() {
      try {
        const response = await this.$http.auth.fetchUser()

        this.user = response.data!
      } catch (error) {
        if (error instanceof Error) logger.error(error.message)
      }
    },

    async logout() {
      try {
        this.accessToken = null
        this.user = null

        const router = useRouter()
        router.replace('/')
      } catch (error) {
        if (error instanceof Error) logger.error(error.message)
      }
    },

    async refreshToken(refreshToken: string) {
      try {
        const response = await this.$http.auth.refreshAccessToken(refreshToken)

        const { accessToken } = useToken()

        accessToken.value = response.data!.accessToken
      } catch (error) {
        if (error instanceof Error) logger.error(error.message)
        await this.logout()
      }
    },

    async resendVerificationEmail() {
      try {
        await this.$http.auth.resendVerificationEmail()
      } catch (error) {
        if (error instanceof Error) logger.error(error.message)
      }
    },
  },

  persist: {
    key: 'kut.accessToken',
    paths: ['accessToken'],
  },
})
