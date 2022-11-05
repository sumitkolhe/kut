<script lang="ts" setup>
const props = defineProps({
  text: {
    type: String,
    default: () => '',
    required: true,
  },
})
</script>

<template>
  <div class="w-full px-4 sm:w-1/2 lg:w-1/4">
    <div class="relative inline-block group">
      <slot></slot>
      <div
        class="absolute bottom-full left-1/2 z-50 mb-3 -translate-x-1/2 whitespace-nowrap rounded bg-gray-900 dark:bg-gray-50 py-[6px] px-4 text-sm font-semibold text-white opacity-0 group-hover:opacity-100"
      >
        <span
          class="absolute bottom-[-3px] left-1/2 -z-10 h-2 w-2 -translate-x-1/2 rotate-45 rounded-sm bg-gray-900 dark:bg-gray-50"
        ></span>
        <p class="text-sm font-normal dark:text-gray-900">{{ props.text }}</p>
      </div>
    </div>
  </div>
</template>
