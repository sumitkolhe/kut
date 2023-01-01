<script lang="ts" setup>
// import { Switch } from '@headlessui/vue'

// const props = defineProps({})

const enabled = ref(false)

// const emit = defineEmits(['update:modelValue'])

// const updateValue = (e: Event) => emit('update:modelValue', (e.target as HTMLInputElement).value)
</script>

<template>
  <label for="toggle-example" class="relative mb-4 flex cursor-pointer items-center">
    <input id="toggle-example" v-model="enabled" type="checkbox" class="sr-only" />
    <div class="toggle-bg h-6 w-11 rounded-full border-2 border-gray-200 bg-gray-200"></div>
  </label>
</template>

<style>
.toggle-bg:after {
  content: '';
  @apply absolute top-0.5 left-0.5 h-5 w-5 rounded-full border border-gray-300 bg-white shadow-sm transition;
}

input:checked + .toggle-bg:after {
  transform: translateX(100%);
  @apply border-white;
}

input:checked + .toggle-bg {
  @apply border-gray-600 bg-gray-900;
}
</style>
