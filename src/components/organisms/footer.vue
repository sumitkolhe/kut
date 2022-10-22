<script lang="ts" setup>
const { isDarkTheme } = useTheme()
</script>

<template>
  <footer class="bg-gray-100 dark:bg-gray-900 bottom-0 w-full border-t dark:border-gray-700 px-4">
    <div class="max-w-screen-xl flex flex-col space-y-4 md:space-y-6 mx-auto py-10 overflow-hidden">
      <!-- Logo  -->
      <div class="flex flex-col md:flex-row items-center justify-between space-y-4">
        <NuxtLink class="flex items-center space-x-3" to="/dashboard">
          <Icon name="gridicons:link" size="36" class="text-red-500" />
          <p class="font-medium uppercase text-lg dark:text-gray-50">Trym</p>
        </NuxtLink>

        <div class="w-auto cursor-pointer order-1">
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
              name="icon-prefix"
              class="block cursor-pointer bg-white text-gray-900 dark:text-gray-50 dark:bg-gray-900 w-full truncate rounded border-gray-200 dark:border-gray-700 py-2 px-10 text-sm transition focus:border-gray-200 focus:dark:border-gray-700 focus:ring-0"
            >
              <option :value="false">Light</option>
              <option :value="true">Dark</option>
            </select>
          </div>
        </div>
      </div>

      <!-- System health row  -->
      <div class="flex flex-col md:flex-row space-y-4 items-center justify-between">
        <div
          class="border dark:border-gray-700 md:order-2 order-1 flex flex-row items-center py-2 px-4 space-x-3 rounded text-sm"
        >
          <span class="text-gray-900 dark:text-gray-200">Status:</span>
          <div class="w-2 h-2 rounded-full bg-success"></div>
          <span class="text-success"> System Healthy </span>
        </div>

        <div class="md:order-3 order-2">
          <NuxtLink class="text-gray-500 cursor-pointer hover:text-gray-400">
            <Icon name="iconoir:github" size="24" />
          </NuxtLink>
        </div>

        <div class="order-3 md:order-1">
          <p class="text-center text-sm text-gray-400">&copy; 2020 Trym. All rights reserved.</p>
        </div>
      </div>
    </div>
  </footer>
</template>
