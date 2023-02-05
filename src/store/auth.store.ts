import { defineStore } from 'pinia'
import { logger } from 'utils/logger'
import type { FetchError } from 'ofetch'
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
        const response = await this.$http.auth.login(email, password)

        if (response.data?.accessToken) this.accessToken = response.data.accessToken

        return { error: null }
      } catch (err) {
        const error = (err as FetchError) || Error
        logger.error(error?.message)
        return { error: error?.data?.message || error?.message }
      }
    },

    async registerUser(email: string, password: string) {
      try {
        await this.$http.auth.register(email, password)

        return { error: null }
      } catch (err) {
        const error = (err as FetchError) || Error
        logger.error(error?.message)
        return { error: error?.data?.message || error?.message }
      }
    },

    async fetchUser() {
      try {
        const response = await this.$http.auth.fetchUser()

        this.user = response.data!

        return { error: null }
      } catch (err) {
        const error = (err as FetchError) || Error
        logger.error(error?.message)
        return { error: error?.data?.message || error?.message }
      }
    },

    async logout() {
      try {
        this.accessToken = null
        this.user = null

        navigateTo('/')
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

        return { error: null }
      } catch (err) {
        const error = (err as FetchError) || Error
        logger.error(error?.message)
        return { error: error?.data?.message || error?.message }
      }
    },

    async verifyEmail(token: string) {
      try {
        await this.$http.auth.verifyEmail(token)

        return { error: null }
      } catch (err) {
        const error = (err as FetchError) || Error
        logger.error(error?.message)
        return { error: error?.data?.message || error?.message }
      }
    },
  },

  persist: [
    {
      key: 'kut.accessToken',
      paths: ['accessToken'],
    },
    {
      key: 'kut.currentUser',
      paths: ['user.email'],
    },
  ],
})
