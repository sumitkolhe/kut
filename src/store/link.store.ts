import { defineStore } from 'pinia'
import { FetchError } from 'ohmyfetch'
import { logger } from 'utils/logger'
import type { Link } from 'interfaces/link.interface'

export const useLinkStore = defineStore('links', {
  state: () => ({
    allLinks: [] as Link[],
    totalCount: 0,
  }),
  actions: {
    async shortenLink(linkPayload: Pick<Link, 'alias' | 'target' | 'meta' | 'description'>) {
      try {
        await this.$http.link.shorten(linkPayload)
      } catch (error) {
        if (error instanceof FetchError) {
          logger.error(error.message)
        }
      }
    },

    async fetchAllLinks(offset = 0, limit = 5) {
      try {
        this.allLinks = []
        this.totalCount = 0

        const response = await this.$http.link.fetchLinks(offset, limit)

        this.allLinks = response.data!.links!
        this.totalCount = response.data!.total!
      } catch (error) {
        if (error instanceof FetchError) {
          logger.error(error.message)
        }
      }
    },

    async deleteLink(alias: string) {
      try {
        await this.$http.link.deleteLink(alias)
      } catch (error) {
        if (error instanceof FetchError) {
          logger.error(error.message)
        }
      }
    },
  },
})
