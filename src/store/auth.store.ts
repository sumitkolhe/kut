import { defineStore } from 'pinia'
import { logger } from 'utils/logger'
import type { FetchError } from 'ofetch'
import type { UserDto } from 'server/modules/users/dto/user.dto'

interface State {
  user: Omit<UserDto, 'apiKey' | 'userLinks'> | null
  isLoggedIn: boolean
  accessToken: string | null
  refreshToken: string | null
}

export const useAuthStore = defineStore('authentication-store', {
  state: (): State => ({
    user: null,
    isLoggedIn: false,
    accessToken: null,
    refreshToken: null,
  }),

  actions: {
    async loginUser(email: string, password: string) {
      try {
        const response = await this.$http.auth.login(email, password)

        if (response.data?.accessToken) {
          this.accessToken = response.data.accessToken
          this.refreshToken = response.data.refreshToken
          this.isLoggedIn = true
        }

        return { error: null }
      } catch (err) {
        const error = (err as FetchError) || Error
        logger.error(error?.message)

        return { error: error?.data?.message || error?.message }
      }
    },

    async loginWithGithub(code: string) {
      try {
        const response = await this.$http.auth.loginWithGithub(code)

        if (response.data?.accessToken) {
          this.accessToken = response.data.accessToken
          this.refreshToken = response.data.refreshToken
          this.isLoggedIn = true
        }

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
        this.isLoggedIn = true

        return { error: null }
      } catch (err) {
        const error = (err as FetchError) || Error
        logger.error(error?.message)

        return { error: error?.data?.message || error?.message }
      }
    },

    logout() {
      try {
        this.isLoggedIn = false
        this.accessToken = null
        this.refreshToken = null
        this.user = null

        navigateTo('/')
      } catch (error) {
        if (error instanceof Error) logger.error(error.message)
      }
    },

    async refreshAccessToken(refreshToken: string | null) {
      try {
        if (!refreshToken) return this.logout()

        const response = await this.$http.auth.refreshAccessToken(refreshToken)

        if (response.data?.accessToken) this.accessToken = response.data?.accessToken
      } catch (error) {
        if (error instanceof Error) logger.error(error.message)
        this.logout()
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
      key: 'kut.refreshToken',
      paths: ['refreshToken'],
    },
    {
      key: 'kut.isLoggedIn',
      paths: ['isLoggedIn'],
    },
  ],
})
