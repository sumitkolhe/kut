<script lang="ts" setup>
const props = defineProps({
  label: {
    type: String,
    default: '',
    required: false,
  },
  disabled: {
    type: Boolean,
    default: false,
    required: false,
  },
  errors: {
    type: Array,
    default: () => [],
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
  modelValue: {
    type: String || Number,
    default: () => null,
    required: false,
  },
})

const emit = defineEmits(['update:modelValue'])

const updateValue = (e: Event) => emit('update:modelValue', (e.target as HTMLInputElement).value)
</script>

<template>
  <div class="flex flex-col w-full px-0 py-0 space-y-1 bg-transparent border-none">
    <label class="text-sm text-gray-500">{{ props.label }}</label>
    <div class="relative">
      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5">
        <Icon :name="props.prefixIcon" size="20" class="text-gray-600" />
      </div>
      <input
        v-bind="$attrs"
        :value="modelValue"
        :disabled="props.disabled"
        :class="[
          props.errors.length > 0
            ? 'border-error placeholder:text-error placeholder:opacity-50 focus:border-error focus:ring-error'
            : 'border-gray-200 placeholder:text-gray-300 focus:border-black focus:ring-black',
          props.prefixIcon ? 'pl-9' : '',
          props.suffixIcon ? 'pr-9' : '',
        ]"
        class="block w-full rounded text-sm h-[40px] transition disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-75"
        @input="updateValue"
      />

      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5">
        <Icon :name="props.suffixIcon" size="20" class="text-gray-600" />
      </div>
    </div>
    <div class="h-2 text-xs font-light tracking-normal text-error">
      <p v-show="props.errors.length > 0">{{ props.errors[0] }}</p>
    </div>
  </div>
</template>
