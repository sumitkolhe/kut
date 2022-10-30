<script lang="ts" setup>
import ShortenLink from 'components/molecules/shorten-link.vue'
import { useLinkStore } from 'store/link.store'
import { useTimeAgo } from '@vueuse/core'

definePageMeta({
  middleware: ['auth', 'verify-email'],
})

// store
const LinkStore = useLinkStore()

onMounted(async () => await LinkStore.fetchAllLinks())

const allLinks = computed(() => LinkStore.allLinks)
</script>

<template>
  <section class="my-6 md:my-8 gap-6 w-full">
    <ShortenLink />

    <p class="py-2 mt-6 font-medium">Recent Links</p>
    <div class="divide-y dark:divide-gray-700 rounded border dark:border-gray-700">
      <div
        v-for="(link, index) in allLinks"
        :key="index"
        class="p-4 grid items-center grid-cols-1 sm:grid-cols-2 gap-6 lg:grid-cols-4 dark:bg-gray-900 bg-gray-50"
      >
        <div>
          <p class="text-sm font-medium text-red-500 truncate hover:underline">
            {{ link.target }}
          </p>
          <p class="mt-2 flex items-center text-sm text-gray-400">
            <span class="truncate hover:underline">{{ link.shortUrl }}</span>
          </p>
        </div>
        <div class="flex items-center space-x-2">
          <p class="text-xl">{{ link.visitCount }}</p>
          <p class="text-gray-500">views</p>
        </div>

        <div>
          <p class="text-sm text-gray-500">
            Created
            <span>{{ useTimeAgo(link.createdAt).value }}</span>
          </p>
          <p class="mt-2 text-sm text-gray-500">
            Updated
            <span>{{ useTimeAgo(link.createdAt).value }}</span>
          </p>
        </div>

        <div>
          <Icon name="ic:twotone-lock" />
        </div>
      </div>
    </div>
    <!-- <div class="flex justify-end">
      <nav class="inline-flex rounded-md shadow-sm border" aria-label="Pagination">
        <a
          href="#"
          class="relative inline-flex items-center rounded-l-md bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
        >
          <span class="sr-only">Previous</span>
          <Icon name="material-symbols:chevron-left-rounded" size="24" />
        </a>

        <a
          href="#"
          aria-current="page"
          class="relative z-10 inline-flex items-center bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 focus:z-20"
          >1</a
        >

        <span
          class="relative inline-flex items-center bg-white px-4 py-2 text-sm font-medium text-gray-700"
          >...</span
        >
        <a
          href="#"
          class="relative hidden items-center bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 md:inline-flex"
          >8</a
        >

        <a
          href="#"
          class="relative inline-flex items-center rounded-r-md bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
        >
          <span class="sr-only">Next</span>
          <Icon name="material-symbols:chevron-right-rounded" size="24" />
        </a>
      </nav>
    </div> -->
  </section>
</template>
