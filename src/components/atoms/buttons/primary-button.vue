<script setup lang="ts">
import Spinner from 'components/atoms/spinner.vue'

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
    class="relative inline-flex items-center justify-center w-full px-4 py-2 tracking-wide transition bg-gray-900 border border-gray-900 rounded appearance-none cursor-pointer select-none text-gray-50 dark:border-gray-50 dark:bg-gray-50 dark:text-gray-900 hover:border-gray-900 hover:text-gray-900 dark:hover:text-gray-50 hover:bg-gray-50 dark:hover:bg-gray-900 dark:hover:border-gray-50 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:dark:bg-gray-800 disabled:text-gray-300 disabled:dark:text-gray-400 disabled:border-gray-200 disabled:dark:border-gray-700"
    v-bind="$attrs"
  >
    <div
      v-if="!props.loading"
      class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
    >
      <icon :name="props.prefixIcon" size="20" />
    </div>
    <spinner v-if="loading" />
    <p v-else class="text-sm">
      <slot />
    </p>
    <div
      v-if="!props.loading"
      class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
    >
      <icon :name="props.suffixIcon" size="20" />
    </div>
  </button>
</template>
