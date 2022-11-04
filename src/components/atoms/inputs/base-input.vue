<script lang="ts" setup>
import type { PropType } from 'vue'

const props = defineProps({
  label: {
    type: String,
    default: () => '',
    required: false,
  },
  errors: {
    type: Array,
    default: () => [],
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
  modelValue: {
    type: String as PropType<string | number | Date | null>,
    default: () => null,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])

const updateValue = (e: Event) => emit('update:modelValue', (e.target as HTMLInputElement).value)
</script>

<template>
  <div class="flex flex-col block w-full p-0 bg-transparent border-none">
    <label v-if="props.label" class="mb-1 text-sm text-gray-500">{{ props.label }}</label>
    <div class="relative">
      <div class="absolute inset-y-0 left-0 flex items-center pl-2.5 pointer-events-none">
        <Icon :name="props.prefixIcon" size="20" class="text-gray-400" />
      </div>
      <input
        type="text"
        v-bind="$attrs"
        :value="modelValue"
        :class="[
          props.errors.length > 0
            ? 'border-error  dark:border-error  placeholder:opacity-50 focus:border-error focus:ring-error dark:focus:ring-error dark:focus:border-error'
            : 'border-gray-200  focus:border-black focus:ring-black',
          props.prefixIcon ? 'pl-9' : '',
          props.suffixIcon ? 'pr-9' : '',
        ]"
        class="block w-full py-2.5 text-sm transition border focus:ring-0 border-gray-200 rounded dark:bg-gray-900 dark:border-gray-700 dark:focus:border-gray-400 dark:placeholder:text-gray-500 dark:text-gray-200 placeholder:text-gray-300 placeholder:font-light focus:ring-0 focus:border-gray-900 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400 disabled:opacity-75"
        @input="updateValue"
      />

      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5">
        <Icon :name="props.suffixIcon" size="20" class="text-gray-400" />
      </div>
    </div>
    <div
      v-if="props.errors.length > 0"
      class="h-4 py-1 text-xs font-light tracking-normal text-error"
    >
      <p>{{ props.errors[0] }}</p>
    </div>
  </div>
</template>
