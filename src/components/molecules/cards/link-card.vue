<script setup lang="ts">
import { useTimeAgo } from '@vueuse/core'
import LinkMenu from 'components/molecules/menus/link-menu.vue'
import type { PropType } from 'vue'

// emits
defineEmits(['delete-link', 'edit-link', 'qr-code'])

// props
const props = defineProps({
  alias: {
    type: [String, null] as PropType<string | null>,
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
    type: [String, null] as PropType<string | null>,
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

const { copy, copied, text } = useClipboard({ source: props.shortUrl })

watch(copied, (clicked) => {
  if (clicked) createToast(`${text.value} copied to clipboard`, { type: 'success' })
})
</script>

<template>
  <div
    class="flex w-full flex-col items-center gap-y-4 rounded-md border bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900 md:px-6 md:py-5 lg:flex-row"
  >
    <div
      class="flex w-full flex-row items-center justify-between lg:flex-col lg:items-start lg:space-y-1"
    >
      <p class="text-xs uppercase tracking-wider text-gray-300">Short Link</p>

      <div class="flex items-center space-x-2">
        <NuxtLink
          target="_blank"
          :to="props.shortUrl"
          class="flex items-center text-sm text-gray-500"
        >
          <span title="Shortened Link" class="truncate hover:underline">{{ props.shortUrl }}</span>
        </NuxtLink>
        <button class="active:text-red-500" @click.stop="copy()">
          <Icon name="ph:copy-duotone" />
        </button>
      </div>
    </div>

    <div
      class="flex w-full flex-row items-center justify-between lg:flex-col lg:items-start lg:space-y-1"
    >
      <p class="text-xs uppercase tracking-wider text-gray-300">Target</p>
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
        <NuxtLink
          v-slice="20"
          :to="`/dashboard/links/${props.alias}`"
          class="truncate text-sm text-gray-500 hover:underline"
        >
          <span class="text-sm dark:text-gray-200">{{ props.visitCount }}</span>
          {{ props.visitCount > 1 ? 'views' : 'view' }}
        </NuxtLink>
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

    <div class="flex w-full flex-row items-center justify-between space-x-4 md:w-fit">
      <div title="QR Code" class="cursor-pointer rounded p-1 hover:bg-red-300 hover:bg-opacity-20">
        <icon
          name="ph:qr-code-duotone"
          class="text-red-500"
          size="26"
          @click="$emit('qr-code', props.shortUrl)"
        />
      </div>

      <link-menu @edit-link="$emit('edit-link')" @delete-link="$emit('delete-link')" />
    </div>
  </div>
</template>
