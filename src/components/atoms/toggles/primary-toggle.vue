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
    class="flex items-center h-8 p-1 duration-300 bg-gray-300 rounded-full cursor-pointer w-14"
    :class="{ 'bg-green-500': props.modelValue }"
    @click="updateValue"
  >
    <div
      class="w-6 h-6 duration-300 transform bg-white rounded-full shadow-md"
      :class="{ 'translate-x-6': props.modelValue }"
    ></div>
  </div>
</template>
