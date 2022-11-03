<script lang="ts" setup>
const props = defineProps({
  modelValue: String || Number,
})

const emit = defineEmits(['update:modelValue'])

const updateValue = (event: any) => emit('update:modelValue', event.target.value)
</script>

<template>
  <input
    :value="props.modelValue"
    type="text"
    placeholder="Placeholder"
    class="w-full dark:bg-gray-900 dark:border-gray-700 dark:focus:border-gray-400 dark:placeholder:text-gray-500 dark:text-gray-200 placeholder:text-gray-300 placeholder:font-light block w-full rounded border-gray-200 border focus:ring-0 text-sm transition focus:border-gray-900 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-75"
    @input="updateValue"
  />
</template>
