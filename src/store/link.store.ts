import { defineStore } from 'pinia'
import type { Link } from 'interfaces/link.interface'

export const useTagsStore = defineStore('links', {
  state: () => ({}),
  actions: {
    async shortenLink(linkPayload: Pick<Link, 'alias' | 'target' | 'meta' | 'description'>) {
      const response = await useRequest('/link/shorten', {
        body: linkPayload,
        method: 'POST',
      })
    },
  },
  getters: {},
})
