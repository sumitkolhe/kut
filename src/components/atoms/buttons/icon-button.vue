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
    class="inline-flex items-center dark:bg-gray-900 dark:text-gray-700 dark:disabled:bg-gray-800 dark:border-gray-700 justify-center w-10 h-10 border border-gray-200 rounded bg-gray-50 disabled:bg-gray-100 disabled:text-gray-300 disabled:pointer-events-none disabled:cusrsor-not-allowed"
  >
    <Icon :name="props.icon" size="20" class="text-:gray-400 dark:text-gray-400" />
  </button>
</template>
