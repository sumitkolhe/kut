<script setup lang="ts">
const props = defineProps({
  loading: {
    type: Boolean,
    default: () => false,
    required: false,
  },
  prefixIcon: {
    type: String,
    default: () => '',
    required: false,
  },
  suffixIcon: {
    type: String,
    default: () => '',
    required: false,
  },
})
</script>

<template>
  <button
    :disabled="loading"
    type="button"
    :class="[props.prefixIcon ? 'pl-10' : '', props.suffixIcon ? 'pr-10' : '']"
    class="relative inline-flex w-full cursor-pointer select-none appearance-none items-center justify-center rounded border border-gray-200 bg-gray-50 px-4 py-2 tracking-wide text-gray-500 transition hover:border-gray-900 hover:bg-gray-50 hover:text-gray-900 disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-100 disabled:text-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-500 dark:hover:border-gray-50 dark:hover:bg-gray-900 dark:hover:text-gray-50 disabled:dark:border-gray-700 disabled:dark:bg-gray-800 disabled:dark:text-gray-400"
    v-bind="$attrs"
  >
    <div
      v-if="!props.loading"
      class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
    >
      <icon :name="props.prefixIcon" size="20" />
    </div>
    <icon v-if="loading" name="svg-spinners:270-ring-with-bg" />
    <p v-else class="text-sm">
      <slot />
    </p>
    <div
      v-if="!props.loading"
      class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
    >
      <icon :name="props.suffixIcon" size="20" />
    </div>
  </button>
</template>
