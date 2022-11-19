<script setup lang="ts">
import Tooltip from 'components/atoms/tooltip.vue'
import { useTimeAgo } from '@vueuse/core'

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

const emits = defineEmits(['delete-link'])

const deleteLink = (alias: string) => {
  emits('delete-link', alias)
}
</script>

<template>
  <div
    class="flex flex-col gap-4 lg:flex-row items-center justify-between w-full p-4 md:px-6 md:py-6 last:rounded-b first:rounded-t dark:bg-gray-900 bg-gray-50"
  >
    <div class="space-y-1">
      <p class="text-xs text-gray-300 tracking-wider uppercase">Short Link</p>
      <NuxtLink
        target="_blank"
        :to="props.shortUrl"
        class="flex items-center text-sm text-gray-500"
      >
        <Tooltip text="Shortened Link">
          <span class="truncate hover:underline">{{ props.shortUrl }}</span>
        </Tooltip>
      </NuxtLink>
    </div>

    <div class="space-y-1">
      <p class="text-xs text-gray-300 tracking-wider uppercase">Original Link</p>
      <NuxtLink
        v-slice="20"
        target="_blank"
        :to="props.target"
        class="text-sm text-gray-500 truncate hover:underline"
      >
        {{ props.target }}
      </NuxtLink>
    </div>

    <div class="space-y-1">
      <p class="text-xs text-gray-300 tracking-wider uppercase">Views</p>

      <p class="text-gray-500">
        <span class="dark:text-gray-200">{{ props.visitCount }}</span>
        {{ props.visitCount > 1 ? 'views' : 'view' }}
      </p>
    </div>

    <div class="space-y-1">
      <p class="text-xs text-gray-300 uppercase tracking-wider">Created</p>

      <p class="text-gray-500">
        <span> {{ useTimeAgo(props.createdAt).value }}</span>
      </p>
    </div>

    <div
      class="space-y-1 space-x-6 flex border p-2 rounded dark:bg-gray-800 dark:border-gray-700 bg-gray-100 justify-center flex-row items-center"
    >
      <Tooltip text="Protected Link">
        <Icon
          name="ph:shield-check-duotone"
          class="text-red-500"
          @click="deleteLink(props.alias)"
        />
      </Tooltip>
      <Tooltip text="QR Code">
        <Icon name="ph:qr-code-duotone" class="text-red-500" @click="deleteLink(props.alias)" />
      </Tooltip>
      <Tooltip text="Link Disabled">
        <Icon name="ph:lock-simple-duotone" class="text-red-500" @click="deleteLink(props.alias)" />
      </Tooltip>
      <Tooltip text="Edit Link">
        <Icon name="ph:lock-simple-duotone" class="text-red-500" @click="deleteLink(props.alias)" />
      </Tooltip>
      <Tooltip text="Delete Link">
        <Icon name="ph:lock-simple-duotone" class="text-red-500" @click="deleteLink(props.alias)" />
      </Tooltip>
    </div>
  </div>
</template>
