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
  <div class="w-full">
    <div class="group relative inline-block">
      <div
        class="bg-primary-900 dark:bg-primary-50 absolute bottom-full left-1/2 z-50 mb-3 -translate-x-1/2 whitespace-nowrap rounded px-4 py-2 text-sm font-semibold text-white opacity-0 group-hover:opacity-100"
      >
        <span
          class="bg-primary-900 dark:bg-primary-50 absolute bottom-[-3px] left-1/2 -z-10 h-2 w-2 -translate-x-1/2 rotate-45 rounded-sm"
        ></span>
        <p class="dark:text-primary-900 text-sm font-normal">{{ props.text }}</p>
      </div>
      <slot></slot>
    </div>
  </div>
</template>
