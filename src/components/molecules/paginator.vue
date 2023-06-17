<script lang="ts" setup>
import IconButton from 'components/atoms/button/icon-button.vue'

defineProps({
  isFirstPage: {
    type: Boolean,
    default: () => true,
    required: true,
  },
  isLastPage: {
    type: Boolean,
    default: () => false,
    required: true,
  },
  currentPage: {
    type: Number,
    default: () => 1,
    required: true,
  },
  pageCount: {
    type: Number,
    default: () => 1,
    required: true,
  },
})

const emit = defineEmits(['prev-page', 'next-page'])

const prev = () => emit('prev-page')
const next = () => emit('next-page')
</script>

<template>
  <div class="mb-0 mt-6 flex items-center justify-end gap-3">
    <icon-button :disabled="isFirstPage" icon="line-md:chevron-left" @click="prev" />
    <p class="dark:text-primary-400 text-sm">
      {{ currentPage }}
      <span class="mx-0.25">/</span>
      {{ pageCount }}
    </p>
    <icon-button :disabled="isLastPage" icon="line-md:chevron-right" @click="next" />
  </div>
</template>
