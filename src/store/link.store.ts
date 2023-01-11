import { defineStore } from 'pinia'
import { FetchError } from 'ohmyfetch'
import { logger } from 'utils/logger'
import type { Link } from 'interfaces/link.interface'

export const useLinkStore = defineStore('links', {
  state: () => ({
    allLinks: [] as Link[],
    link: {} as Link,
    linkViews: {} as Record<string, number>,
    overviewStats: {} as Record<string, number>,
    totalCount: 0,
  }),
  actions: {
    async shortenLink(linkPayload: Pick<Link, 'alias' | 'target' | 'meta' | 'description'>) {
      try {
        const response = await this.$http.link.shorten(linkPayload)

        if (response.data) this.allLinks.unshift(response.data)
      } catch (error) {
        if (error instanceof FetchError) {
          logger.error(error.message)
        }
      }
    },

    async fetchAllLinks(offset = 0, limit = 5, search?: string) {
      try {
        this.allLinks = []
        this.totalCount = 0

        const response = await this.$http.link.fetchLinks(offset, limit, search)

        this.allLinks = response.data!.links!
        this.totalCount = response.data!.total!
      } catch (error) {
        if (error instanceof FetchError) {
          logger.error(error.message)
        }
      }
    },

    async fetchLinkByAlias(alias: string) {
      try {
        const response = await this.$http.link.fetchLink(alias)

        this.link = response.data!
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

    async fetchLinkViewStats(alias: string, period?: string) {
      try {
        const views = await this.$http.statistics.linkViews(alias, period)

        this.linkViews = views.data!
      } catch (error) {
        if (error instanceof FetchError) {
          logger.error(error.message)
        }
      }
    },

    async fetchOverviewStats() {
      try {
        const views = await this.$http.statistics.overview()

        this.overviewStats = views.data!
      } catch (error) {
        if (error instanceof FetchError) {
          logger.error(error.message)
        }
      }
    },
  },
})
