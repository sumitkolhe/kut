import { FetchError } from 'ohmyfetch'
import { logger } from 'utils/logger'
import { useJwt } from '@vueuse/integrations/useJwt'
import type { Token, Tokens } from 'interfaces/token.interface'
import type { CustomResponse } from 'interfaces/response.interface'
import type { User } from 'interfaces/user.interface'

export default defineNuxtPlugin(() => {
  const accessTokenCookie = useCookie('accessToken')
  const refreshTokenCookie = useCookie('refreshToken')

  const accessToken = useState('accessToken', () => accessTokenCookie.value)
  const refreshToken = useState('refreshToken', () => refreshTokenCookie.value)

  addRouteMiddleware('auth', async () => {
    const { $auth } = useNuxtApp()

    // if not access token present, logout the user
    if (!accessToken.value) {
      return navigateTo('/auth/login')
    }

    // decode the token to get expiry and refresh it if token already expired
    const { payload } = useJwt(accessToken.value)

    if (payload.value!.exp! < Date.now() / 1000) {
      return await $auth.refreshToken()
    }

    if (Object.keys($auth.user.value).length === 0) {
      await $auth.fetchUser()
    }
  })

  return {
    provide: {
      auth: {
        user: useState(
          'auth.user',
          () =>
            ({} as Partial<
              Pick<
                User,
                | 'email'
                | 'firstName'
                | 'lastName'
                | 'isBanned'
                | 'isVerified'
                | 'createdAt'
                | 'updatedAt'
              >
            >)
        ),

        async login(email: string, password: string) {
          try {
            const response = await useRequest<CustomResponse<Tokens>>('/auth/login', {
              body: { email, password },
              method: 'POST',
            })

            accessToken.value = response.data!.accessToken!
            refreshToken.value = response.data!.refreshToken!
          } catch (error) {
            if (error instanceof FetchError) {
              logger.error(error.message)
            }
          }
        },

        async register(email: string, password: string) {
          try {
            await useRequest<CustomResponse<null>>('/auth/register', {
              body: { email, password },
              method: 'POST',
            })
          } catch (error) {
            if (error instanceof FetchError) {
              logger.error(error.message)
            }
          }
        },

        async fetchUser() {
          try {
            const response = await useRequest<CustomResponse<User>>('/auth/me', {
              method: 'GET',
            })

            this.user.value = response.data!
          } catch (error) {
            if (error instanceof FetchError) {
              logger.info(error.message)
            }
          }
        },

        async logout() {
          try {
            const router = useRouter()

            await useRequest<CustomResponse<null>>('/auth/logout', {
              method: 'GET',
            })
            router.replace('/auth/login')
          } catch (error) {
            if (error instanceof FetchError) {
              logger.info(error.message)
            }
          }
        },

        async refreshToken() {
          try {
            const response = await $fetch.raw<CustomResponse<Token>>('/api/auth/refresh-token', {
              method: 'POST',
              body: { refreshToken: refreshToken.value },
            })

            accessToken.value = response._data!.data!.accessToken!
          } catch {
            await this.logout()
          }
        },

        async resendVerificationEmail() {
          try {
            await useRequest<CustomResponse<null>>('/auth/resend-verification-email', {
              method: 'POST',
            })
          } catch (error) {
            if (error instanceof FetchError) {
              logger.info(error.message)
            }
          }
        },
      },
    },
  }
})
