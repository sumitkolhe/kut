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
    class="disabled:cusrsor-not-allowed border-primary-200 bg-primary-50 disabled:bg-primary-100 disabled:text-primary-300 dark:border-primary-700 dark:bg-primary-900 dark:text-primary-700 dark:disabled:bg-primary-800 inline-flex h-10 w-10 items-center justify-center rounded border disabled:pointer-events-none"
  >
    <icon :name="props.icon" size="20" class="text-:gray-400 dark:text-primary-400" />
  </button>
</template>
