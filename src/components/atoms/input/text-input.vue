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
  clearable: {
    type: Boolean,
    default: () => false,
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
  loading: {
    type: Boolean,
    default: () => false,
  },
  modelValue: {
    type: [String, Number, Date, null] as PropType<string | number | Date | null>,
    default: () => null,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])

const updateValue = (e: Event) => emit('update:modelValue', (e.target as HTMLInputElement).value)

const clearText = () => emit('update:modelValue', null)
</script>

<template>
  <div class="flex w-full flex-col border-none bg-transparent p-0">
    <label v-if="props.label" class="mb-1 text-sm text-gray-500">{{ props.label }}</label>
    <div class="relative">
      <div
        v-if="props.loading"
        class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2.5"
      >
        <icon
          name="line-md:loading-twotone-loop"
          size="20"
          class="text-gray-600 dark:text-gray-300"
        />
      </div>
      <div v-else class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2.5">
        <icon :name="props.prefixIcon" size="20" class="text-gray-400" />
      </div>
      <input
        type="text"
        v-bind="$attrs"
        :value="modelValue"
        :class="[
          props.errors.length > 0
            ? 'border-error  placeholder:opacity-50  focus:border-error focus:ring-error dark:border-error dark:focus:border-error dark:focus:ring-error'
            : 'border-gray-200  focus:border-black focus:ring-black',
          props.prefixIcon ? 'pl-10' : '',
          props.suffixIcon ? 'pr-10' : '',
        ]"
        class="block w-full rounded border border-gray-200 py-2.5 text-sm transition placeholder:font-light placeholder:text-gray-300 focus:border-gray-900 focus:ring-0 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400 disabled:opacity-75 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:placeholder:text-gray-500 dark:focus:border-gray-400"
        @input="updateValue"
      />

      <div
        v-if="props.clearable && modelValue"
        :class="[props.suffixIcon ? 'pr-10' : 'pr-2.5']"
        class="absolute inset-y-0 right-0 flex cursor-pointer items-center"
        @click="clearText"
      >
        <icon name="ph:x-circle" size="20" class="text-gray-400" />
      </div>
      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5">
        <icon :name="props.suffixIcon" size="20" class="text-gray-400" />
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
