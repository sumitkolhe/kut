<script lang="ts" setup>
import BaseButton from 'components/atoms/base-button.vue'
</script>

<template>
  <div class="relative flex w-full">
    <label for="slug" class="sr-only">Enter slug</label>
    <span
      class="flex items-center rounded-l border-t border-l border-b border-gray-200 bg-gray-100 px-3 text-sm text-gray-500"
    >
      https://
    </span>
    <input
      id="name"
      type="text"
      placeholder="Enter a URL"
      class="block w-full rounded-tr rounded-br border-gray-200 border-r border-t border-b focus:ring-0 text-sm transition focus:border-gray-900 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-75"
    />
    <BaseButton class="w-auto px-8 ml-4">Shorten</BaseButton>
  </div>
</template>
