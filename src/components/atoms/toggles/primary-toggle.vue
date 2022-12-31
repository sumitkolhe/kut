<script lang="ts" setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: () => false,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])

const updateValue = (e: Event) => emit('update:modelValue', (e.target as HTMLInputElement).value)
</script>

<template>
  <div
    class="flex h-8 w-14 cursor-pointer items-center rounded-full bg-gray-300 p-1 duration-300"
    :class="{ 'bg-green-500': props.modelValue }"
    @click="updateValue"
  >
    <div
      class="h-6 w-6 transform rounded-full bg-white shadow-md duration-300"
      :class="{ 'translate-x-6': props.modelValue }"
    ></div>
  </div>
</template>
