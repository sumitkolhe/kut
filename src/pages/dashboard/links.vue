<script lang="ts" setup>
import ShortenLink from 'components/molecules/shorten-link.vue'
import { useLinkStore } from 'store/link.store'
import { useTimeAgo } from '@vueuse/core'

import { ref } from 'vue'
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'

const open = ref(true)

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

    <TransitionRoot as="template" :show="open">
      <Dialog as="div" class="relative z-[999999999]" @close="open = false">
        <TransitionChild
          as="template"
          enter="ease-in-out duration-500"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in-out duration-500"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 transition-opacity bg-gray-800 bg-opacity-75" />
        </TransitionChild>

        <div class="fixed bottom-0 flex w-full h-auto rounded-t pointer-events-none rounded-xl">
          <TransitionChild
            as="template"
            enter="transform transition ease-in-out duration-500 sm:duration-700"
            enter-from="translate-y-full"
            enter-to="translate-y-0"
            leave="transform transition ease-in-out duration-500 sm:duration-700"
            leave-from="translate-y-0"
            leave-to="translate-y-full"
          >
            <DialogPanel
              class="relative w-screen rounded-t-lg pointer-events-auto dark:text-gray-200 dark:bg-gray-900 bg-gray-50 dark:border-gray-700 dark:border-t"
            >
              <div class="py-6">ok</div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>
  </section>
</template>
