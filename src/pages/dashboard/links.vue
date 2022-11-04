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
  <section class="w-full gap-6 my-6 md:my-8">
    <ShortenLink />

    <p class="py-2 mt-6 font-medium dark:text-gray-200">Recent Links</p>
    <div class="border divide-y rounded dark:divide-gray-700 dark:border-gray-700">
      <div
        v-for="(link, index) in allLinks"
        :key="index"
        class="grid items-center grid-cols-1 gap-6 p-4 last:rounded-b first:rounded-t sm:grid-cols-2 lg:grid-cols-4 dark:bg-gray-900 bg-gray-50"
      >
        <div>
          <NuxtLink
            target="_blank"
            :to="link.target"
            class="text-sm font-medium text-red-500 truncate hover:underline"
          >
            {{ link.target }}
          </NuxtLink>
          <NuxtLink
            target="_blank"
            :to="link.shortUrl"
            class="flex items-center mt-2 text-sm text-gray-400"
          >
            <span class="truncate hover:underline">{{ link.shortUrl }}</span>
          </NuxtLink>
        </div>
        <div class="flex items-center space-x-2">
          <p class="text-xl dark:text-gray-200">{{ link.visitCount }}</p>
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
  </section>
</template>
