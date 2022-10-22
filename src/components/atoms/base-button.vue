<script setup lang="ts">
import Spinner from '~~/src/components/atoms/spinner.vue'
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
  type: {
    type: String,
    default: 'primary',
    required: false,
  },
  prefixIcon: {
    type: String,
    default: '',
    required: false,
  },
  suffixIcon: {
    type: String,
    default: '',
    required: false,
  },
})
</script>

<template>
  <button
    :disabled="props.disabled || props.loading"
    type="button"
    :class="[
      props.type === 'primary'
        ? 'border-gray-200 bg-gray-900 text-white transition hover:border-black hover:text-black hover:bg-white'
        : 'border-gray-200 bg-white text-black transition hover:border-black hover:text-black hover:bg-white active:bg-gray-200 focus:bg-gray-200',
      props.prefixIcon ? 'pl-10' : '',
      props.suffixIcon ? 'pr-10' : '',
    ]"
    class="px-4 py-2 inline-flex relative w-full disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-300 disabled:border-gray-200 cursor-pointer tracking-wide select-none appearance-none items-center justify-center rounded-[5px] border border-transparent focus:outline-none"
    v-bind="$attrs"
  >
    <div class="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
      <icon :name="props.prefixIcon" size="20" />
    </div>
    <spinner v-if="loading" class="mr-2" />
    <p>
      <slot />
    </p>
    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
      <icon :name="props.suffixIcon" size="20" />
    </div>
  </button>
</template>
