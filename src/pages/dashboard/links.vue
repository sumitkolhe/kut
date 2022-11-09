<script lang="ts" setup>
import ShortenLink from 'components/molecules/shorten-link.vue'
import LinkCard from 'components/molecules/link-card.vue'
import { useLinkStore } from 'store/link.store'
import { useOffsetPagination } from '@vueuse/core'

definePageMeta({
  middleware: ['auth', 'verify-email'],
})

// store
const LinkStore = useLinkStore()

onMounted(async () => await LinkStore.fetchAllLinks())

const allLinks = computed(() => LinkStore.allLinks)
const totalLinks = computed(() => LinkStore.totalCount)

const { currentPage, pageCount, prev, next } = useOffsetPagination({
  total: totalLinks.value,
  page: 1,
  pageSize: 5,
  onPageChange: () => LinkStore.fetchAllLinks(0, currentPage.value),
  onPageSizeChange: () => LinkStore.fetchAllLinks(),
})
</script>

<template>
  <section class="w-full gap-6 my-6 md:my-8">
    <ShortenLink />

    <p class="py-2 mt-6 font-medium dark:text-gray-200">Recent Links</p>
    <div class="border divide-y rounded dark:divide-gray-700 dark:border-gray-700">
      <link-card
        v-for="(link, index) in allLinks.slice(0, 5)"
        :key="index"
        :target="link.target"
        :short-url="link.shortUrl"
        :visit-count="link.visitCount"
        :created-at="link.createdAt"
        :updated-at="link.updatedAt"
      ></link-card>
    </div>
    <div class="flex justify-end">
      {{ totalLinks }}
      <div class="flex items-center items-end justify-end gap-3 my-4">
        <button
          class="inline-flex items-center justify-center w-8 h-8 border border-gray-200 rounded bg-gray-50"
          @click="next"
        >
          <Icon name="line-md:chevron-left" size="16" />
        </button>

        <p class="text-sm">
          {{ currentPage }}
          <span class="mx-0.25">/</span>
          {{ pageCount }}
        </p>

        <button
          class="inline-flex items-center justify-center w-8 h-8 border border-gray-200 rounded bg-gray-50"
          @click="prev"
        >
          <Icon name="line-md:chevron-right" size="16" />
        </button>
      </div>
    </div>
  </section>
</template>
