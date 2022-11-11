<script lang="ts" setup>
import ShortenLink from 'components/molecules/shorten-link.vue'
import LinkCard from 'components/molecules/link-card.vue'
import IconButton from 'components/atoms/buttons/icon-button.vue'
import { useLinkStore } from 'store/link.store'
import { useOffsetPagination } from '@vueuse/core'

definePageMeta({
  middleware: ['auth', 'verify-email'],
})

// store
const LinkStore = useLinkStore()

const totalCount = computed(() => LinkStore.totalCount)
const allLinks = computed(() => LinkStore.allLinks)

onMounted(async () => await LinkStore.fetchAllLinks(0, 5))

// functions
const getPaginatedLinks = async ({
  currentPage,
  currentPageSize,
}: {
  currentPage: number
  currentPageSize: number
}) => {
  await LinkStore.fetchAllLinks((currentPage - 1) * 5, currentPageSize)
}

const { currentPage, pageCount, prev, next, isFirstPage, isLastPage } = useOffsetPagination({
  total: totalCount,
  page: 1,
  pageSize: 5,
  onPageChange: getPaginatedLinks,
})
</script>

<template>
  <section class="w-full gap-6 my-6 md:my-8">
    <ShortenLink />

    <div v-if="allLinks.length > 0">
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
      <div class="flex justify-center md:justify-end">
        <div class="flex items-center items-end justify-end gap-3 mt-6 mb-0">
          <icon-button :disabled="isFirstPage" icon="line-md:chevron-left" @click="prev" />
          <p class="text-sm dark:text-gray-400">
            {{ currentPage }}
            <span class="mx-0.25">/</span>
            {{ pageCount }}
          </p>

          <icon-button :disabled="isLastPage" icon="line-md:chevron-right" @click="next" />
        </div>
      </div>
    </div>
    <div
      v-else
      class="border relative bg-gray-50 my-6 rounded px-4 py-6 h-64 dark:bg-gray-900 dark:border-gray-700 flex items-center flex-col justify-center"
    >
      <Icon name="ph:link-break-duotone" size="44" class="opacity-50 dark:text-gray-400" />
      <p class="mt-4 mb-1 font-medium dark:text-gray-200">No Links</p>
      <p class="text-gray-400 dark:text-gray-500 font-light">Get started by creating a new link.</p>
    </div>
  </section>
</template>
