<script setup lang="ts">
const props = defineProps({
  icon: {
    type: String,
    default: () => '',
    required: false,
  },
})
</script>

<template>
  <button
    v-bind="$attrs"
    class="disabled:cusrsor-not-allowed inline-flex h-10 w-10 items-center justify-center rounded border border-gray-200 bg-gray-50 disabled:pointer-events-none disabled:bg-gray-100 disabled:text-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-700 dark:disabled:bg-gray-800"
  >
    <Icon :name="props.icon" size="20" class="text-:gray-400 dark:text-gray-400" />
  </button>
</template>
