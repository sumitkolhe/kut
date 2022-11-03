import { defineStore } from 'pinia'
import { FetchError } from 'ohmyfetch'
import { logger } from 'utils/logger'
import type { CustomResponse } from 'interfaces/response.interface'
import type { Link } from 'interfaces/link.interface'

export const useLinkStore = defineStore('links', {
  state: () => ({
    allLinks: [] as Link[],
  }),
  actions: {
    async shortenLink(linkPayload: Pick<Link, 'alias' | 'target' | 'meta' | 'description'>) {
      try {
        await useRequest('/link/shorten', {
          body: linkPayload,
          method: 'POST',
        })
      } catch (error) {
        if (error instanceof FetchError) {
          logger.error(error.message)
        }
      }
    },

    async fetchAllLinks() {
      try {
        const response = await useRequest<CustomResponse<Link[]>>('/link', {
          method: 'GET',
        })
        this.allLinks = response.data!
      } catch (error) {
        if (error instanceof FetchError) {
          logger.error(error.message)
        }
      }
    },
  },
  getters: {},
})
