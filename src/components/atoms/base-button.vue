<script setup lang="ts">
const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
    required: false,
  },
  loading: {
    type: Boolean,
    default: false,
    required: false,
  },
})
</script>

<template>
  <button
    :disabled="props.disabled || props.loading"
    type="button"
    class="inline-flex w-full disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400 disabled:border-gray-200 cursor-pointer tracking-wide select-none appearance-none items-center justify-center rounded-md border border-gray-200 bg-gray-900 px-3 py-2 text-white transition hover:border-black hover:text-black hover:bg-white focus:outline-none active:bg-gray-100"
    v-bind="$attrs"
  >
    <Icon v-if="loading" name="line-md:loading-twotone-loop" size="24" />
    <p class="pl-4"><slot /></p>
  </button>
</template>
