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
    <label v-if="props.label" class="text-primary-500 mb-1 text-sm">{{ props.label }}</label>
    <div class="relative">
      <input
        :type="inputMasked ? 'password' : 'text'"
        v-bind="$attrs"
        :value="modelValue"
        :class="[
          props.errors.length > 0
            ? 'border-error  placeholder:opacity-50  focus:border-error focus:ring-error dark:border-error dark:focus:border-error dark:focus:ring-error'
            : 'border-primary-200  focus:border-black focus:ring-black',
        ]"
        class="border-primary-200 placeholder:text-primary-300 focus:border-primary-900 disabled:bg-primary-100 disabled:text-primary-400 dark:border-primary-700 dark:bg-primary-900 dark:text-primary-200 dark:placeholder:text-primary-500 dark:focus:border-primary-400 block w-full rounded border py-2.5 pr-10 text-sm transition placeholder:font-light focus:ring-0 disabled:cursor-not-allowed disabled:opacity-75"
        @input="updateValue"
      />
      <button
        type="button"
        class="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-2.5"
        @click="inputMasked = !inputMasked"
      >
        <icon :name="inputMasked ? 'ph:eye-closed' : 'ph:eye'" size="20" class="text-primary-400" />
      </button>
    </div>
    <div
      v-if="props.errors.length > 0"
      class="h-4 py-1 text-xs font-light tracking-normal text-error"
    >
      <p>{{ props.errors[0] }}</p>
    </div>
  </div>
</template>
