<script setup lang="ts">
import { useTimeAgo } from '@vueuse/core'
import LinkMenu from 'components/molecules/menus/link-menu.vue'
import QrCode from 'components/molecules/panels/qr-code.vue'

// emits
const emits = defineEmits(['delete-link', 'edit-link'])

// props
const props = defineProps({
  alias: {
    type: String,
    required: true,
  },
  target: {
    type: String,
    default: () => '',
    required: false,
  },
  shortUrl: {
    type: String,
    default: () => '',
    required: false,
  },
  description: {
    type: String,
    default: () => '',
    required: false,
  },
  visitCount: {
    type: Number,
    default: () => 0,
    required: false,
  },
  createdAt: {
    type: String,
    default: () => null,
    required: false,
  },
  updatedAt: {
    type: String,
    default: () => null,
    required: false,
  },
})

// ref
const openQrCode = ref(false)

// functions
const deleteLink = (alias: string) => {
  console.log(alias)
  emits('delete-link', alias)
}

const editLink = (alias: string) => {
  emits('edit-link', alias)
}
</script>

<template>
  <div
    class="flex w-full flex-col items-center justify-between gap-y-4 rounded border border-gray-200 bg-gray-50 p-4 hover:border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:hover:border-gray-500 md:px-6 md:py-5 lg:flex-row"
  >
    <div
      class="flex w-full flex-row items-center justify-between lg:flex-col lg:items-start lg:space-y-1"
    >
      <p class="text-xs uppercase tracking-wider text-gray-300">Short Link</p>
      <NuxtLink
        target="_blank"
        :to="props.shortUrl"
        class="flex items-center text-sm text-gray-500"
      >
        <span title="Shortened Link" class="truncate hover:underline">{{ props.shortUrl }}</span>
      </NuxtLink>
    </div>

    <div
      class="flex w-full flex-row items-center justify-between lg:flex-col lg:items-start lg:space-y-1"
    >
      <p class="text-xs uppercase tracking-wider text-gray-300">Original Link</p>
      <NuxtLink
        v-slice="20"
        target="_blank"
        :to="props.target"
        class="truncate text-sm text-gray-500 hover:underline"
      >
        {{ props.target }}
      </NuxtLink>
    </div>

    <div
      class="flex w-full flex-row items-center justify-between lg:flex-col lg:items-start lg:space-y-1"
    >
      <p class="text-xs uppercase tracking-wider text-gray-300">Views</p>

      <p class="text-gray-500">
        <span class="text-sm dark:text-gray-200">{{ props.visitCount }}</span>
        {{ props.visitCount > 1 ? 'views' : 'view' }}
      </p>
    </div>

    <div
      class="flex w-full flex-row items-center justify-between lg:flex-col lg:items-start lg:space-y-1"
    >
      <p class="text-xs uppercase tracking-wider text-gray-300">Added</p>

      <p class="text-sm text-gray-500" :title="props.createdAt">
        {{ useTimeAgo(props.createdAt).value }}
      </p>
    </div>

    <div
      class="flex flex w-full w-full flex-row items-center items-center justify-end justify-between space-x-4 md:w-fit"
    >
      <qr-code :is-open="openQrCode" :link="props.shortUrl" @close="openQrCode = false" />
      <link-menu @edit-link="editLink(props.alias)" @delete-link="deleteLink(props.alias)" />
    </div>
  </div>
</template>
