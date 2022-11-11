<script setup lang="ts">
import Tooltip from 'components/atoms/tooltip.vue'
import { useTimeAgo } from '@vueuse/core'

const props = defineProps({
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
  visitCount: {
    type: Number,
    default: () => 0,
    required: false,
  },
  createdAt: {
    type: Date,
    default: () => null,
    required: false,
  },
  updatedAt: {
    type: Date,
    default: () => null,
    required: false,
  },
})
</script>

<template>
  <div
    class="grid items-center place-items-center grid-cols-1 gap-6 p-4 last:rounded-b first:rounded-t sm:grid-cols-2 lg:grid-cols-4 dark:bg-gray-900 bg-gray-50"
  >
    <div>
      <NuxtLink
        target="_blank"
        :to="props.target"
        class="text-sm font-medium text-red-500 truncate hover:underline"
      >
        {{ props.target }}
      </NuxtLink>

      <NuxtLink
        target="_blank"
        :to="props.shortUrl"
        class="flex items-center mt-2 text-sm text-gray-400"
      >
        <Tooltip text="Shortened Link">
          <span class="truncate hover:underline">{{ props.shortUrl }}</span>
        </Tooltip>
      </NuxtLink>
    </div>
    <div class="flex items-center space-x-2">
      <p class="text-xl dark:text-gray-200">{{ props.visitCount }}</p>
      <p class="text-gray-500">views</p>
    </div>

    <div>
      <p class="text-sm text-gray-500">
        Created
        <span>{{ useTimeAgo(props.createdAt).value }}</span>
      </p>
      <p class="mt-2 text-sm text-gray-500">
        Updated
        <span>{{ useTimeAgo(props.updatedAt).value }}</span>
      </p>
    </div>

    <div>
      <Tooltip text="hello">
        <Icon name="line-md:arrow-right" />
      </Tooltip>
    </div>
  </div>
</template>
