<script setup lang="ts">
const { isDarkTheme } = useTheme()
</script>

<template>
  <div class="relative">
    <div class="absolute inset-y-0 left-0 flex items-center pl-2.5">
      <Icon
        v-if="!isDarkTheme"
        name="line-md:sun-rising-loop"
        size="20"
        class="text-gray-900 dark:text-gray-500"
      />
      <Icon v-else name="line-md:moon" size="20" class="text-gray-900 dark:text-gray-500" />
    </div>
    <select
      id="icon-prefix"
      v-model="isDarkTheme"
      label="theme"
      name="icon-prefix"
      class="block w-full px-10 py-2 text-sm text-gray-900 truncate transition bg-white border-gray-200 rounded cursor-pointer dark:text-gray-50 dark:bg-gray-900 dark:border-gray-700 focus:border-gray-200 focus:dark:border-gray-700 focus:ring-0"
    >
      <option :value="false">Light</option>
      <option :value="true">Dark</option>
    </select>
  </div>
</template>
