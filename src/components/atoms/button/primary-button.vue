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
    :disabled="props.loading"
    type="button"
    :class="[
      props.prefixIcon && !props.loading ? 'pl-10' : '',
      props.suffixIcon && !props.loading ? 'pr-10' : '',
    ]"
    class="border-primary-900 bg-primary-900 text-primary-50 hover:border-primary-900 hover:bg-primary-50 hover:text-primary-900 disabled:border-primary-200 disabled:bg-primary-100 disabled:text-primary-300 dark:border-primary-50 dark:bg-primary-50 dark:text-primary-900 dark:hover:border-primary-50 dark:hover:bg-primary-900 dark:hover:text-primary-50 disabled:dark:border-primary-700 disabled:dark:bg-primary-800 disabled:dark:text-primary-400 relative inline-flex w-full cursor-pointer select-none appearance-none items-center justify-center rounded border px-4 py-2 tracking-wide transition disabled:cursor-not-allowed"
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
