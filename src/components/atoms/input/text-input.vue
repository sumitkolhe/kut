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
    <label v-if="props.label" class="text-primary-500 mb-1 text-sm">{{ props.label }}</label>
    <div class="relative">
      <div
        v-if="props.loading"
        class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2.5"
      >
        <icon
          name="line-md:loading-twotone-loop"
          size="20"
          class="text-primary-600 dark:text-primary-300"
        />
      </div>
      <div v-else class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2.5">
        <icon :name="props.prefixIcon" size="20" class="text-primary-400" />
      </div>
      <input
        type="text"
        v-bind="$attrs"
        :value="modelValue"
        :class="[
          props.errors.length > 0
            ? 'border-error  placeholder:opacity-50  focus:border-error focus:ring-error dark:border-error dark:focus:border-error dark:focus:ring-error'
            : 'border-primary-200  focus:border-black focus:ring-black',
          props.prefixIcon ? 'pl-10' : '',
          props.suffixIcon ? 'pr-10' : '',
        ]"
        class="border-primary-200 placeholder:text-primary-300 focus:border-primary-900 disabled:bg-primary-100 disabled:text-primary-400 dark:border-primary-700 dark:bg-primary-900 dark:text-primary-200 dark:placeholder:text-primary-500 dark:focus:border-primary-400 block w-full rounded border py-2.5 text-sm transition placeholder:font-light focus:ring-0 disabled:cursor-not-allowed disabled:opacity-75"
        @input="updateValue"
      />

      <div
        v-if="props.clearable && modelValue"
        :class="[props.suffixIcon ? 'pr-10' : 'pr-2.5']"
        class="absolute inset-y-0 right-0 flex cursor-pointer items-center"
        @click="clearText"
      >
        <icon name="ph:x-circle" size="20" class="text-primary-400" />
      </div>
      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5">
        <icon :name="props.suffixIcon" size="20" class="text-primary-400" />
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
