import { FetchError } from 'ohmyfetch'
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

    if (!accessToken.value) return navigateTo('/auth/login')

    const { payload } = useJwt(accessToken.value)

    if (payload.value!.exp! < Date.now() / 1000) {
      return await $auth.refreshToken()
    }
  })

  return {
    provide: {
      auth: {
        user: useState(
          'auth.user',
          () =>
            ({
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
            } as User)
        ),
        isLoggedIn: useState('auth.isLoggedIn', () => false),

        async login(email: string, password: string) {
          try {
            const response = await useRequest<CustomResponse<Tokens>>('/auth/login', {
              body: { email, password },
              method: 'POST',
            })

            accessToken.value = response.data!.accessToken!
            refreshToken.value = response.data!.refreshToken!
            this.isLoggedIn.value = true
          } catch (error) {
            if (error instanceof FetchError) {
              const { $logger } = useNuxtApp()
              $logger.error(error.message)
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
              const { $logger } = useNuxtApp()
              $logger.info(error.message)
            }
          }
        },

        async logout() {
          try {
            const router = useRouter()

            await useRequest<CustomResponse<null>>('/auth/logout', {
              method: 'GET',
            })

            router.push('/auth/login')
          } catch (error) {
            if (error instanceof FetchError) {
              const { $logger } = useNuxtApp()
              $logger.info(error.message)
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
      },
    },
  }
})
