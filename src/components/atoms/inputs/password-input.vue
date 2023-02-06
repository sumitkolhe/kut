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
  modelValue: {
    type: [String, Number, Date, null] as PropType<string | number | Date | null>,
    default: () => null,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])

const inputMasked = ref(true)

const updateValue = (e: Event) => emit('update:modelValue', (e.target as HTMLInputElement).value)
</script>

<template>
  <div class="flex w-full flex-col border-none bg-transparent p-0">
    <label v-if="props.label" class="mb-1 text-sm text-gray-500">{{ props.label }}</label>
    <div class="relative">
      <input
        :type="inputMasked ? 'password' : 'text'"
        v-bind="$attrs"
        :value="modelValue"
        :class="[
          props.errors.length > 0
            ? 'border-error  dark:border-error  focus:border-error focus:ring-error dark:focus:ring-error dark:focus:border-error placeholder:opacity-50'
            : 'border-gray-200  focus:border-black focus:ring-black',
        ]"
        class="block w-full rounded border border-gray-200 py-2.5 pr-10 text-sm transition placeholder:font-light placeholder:text-gray-300 focus:border-gray-900 focus:ring-0 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400 disabled:opacity-75 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:placeholder:text-gray-500 dark:focus:border-gray-400"
        @input="updateValue"
      />
      <button
        type="button"
        class="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-2.5"
        @click="inputMasked = !inputMasked"
      >
        <icon
          :name="inputMasked ? 'ph:eye-closed-duotone' : 'ph:eye-duotone'"
          size="20"
          class="text-gray-400"
        />
      </button>
    </div>
    <div
      v-if="props.errors.length > 0"
      class="text-error h-4 py-1 text-xs font-light tracking-normal"
    >
      <p>{{ props.errors[0] }}</p>
    </div>
  </div>
</template>
