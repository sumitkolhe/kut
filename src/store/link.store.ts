import { defineStore } from 'pinia'
import { FetchError } from 'ohmyfetch'
import { logger } from 'utils/logger'
import type { CustomResponse } from 'interfaces/response.interface'
import type { Link } from 'interfaces/link.interface'

export const useLinkStore = defineStore('links', {
  state: () => ({
    allLinks: [] as Link[],
    totalCount: 0,
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

    async fetchAllLinks(offset = 0, limit = 5) {
      try {
        const response = await useRequest<CustomResponse<{ links: Link[]; total: number }>>(
          '/link',
          {
            method: 'GET',
            query: { limit, offset },
          }
        )
        this.allLinks = response.data!.links!
        this.totalCount = response.data!.total!
      } catch (error) {
        if (error instanceof FetchError) {
          logger.error(error.message)
        }
      }
    },
  },
  getters: {},
})
