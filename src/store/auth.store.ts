import { defineStore } from 'pinia'
import { logger } from 'utils/logger'

export const useAuthStore = defineStore('authentication-store', {
  state: () => ({}),
  actions: {
    async loginUser(email: string, password: string) {
      try {
        await this.$http.auth.login(email, password)
      } catch (error) {
        if (error instanceof Error) logger.error(error.message)
      }
    },

    async registerUser(email: string, password: string) {
      try {
        await this.$http.auth.login(email, password)
      } catch (error) {
        if (error instanceof Error) logger.error(error.message)
      }
    },

    async logout() {
      try {
        await this.$http.auth.logout()

        const router = useRouter()

        router.replace('/')
      } catch (error) {
        if (error instanceof Error) logger.error(error.message)
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
})
