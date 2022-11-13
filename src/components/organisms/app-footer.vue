<script lang="ts" setup>
import Logo from 'components/atoms/logo.vue'
const { isDarkTheme } = useTheme()
</script>

<template>
  <footer class="bottom-0 w-full px-4 bg-white border-t dark:bg-gray-900 dark:border-gray-700">
    <div class="flex flex-col max-w-screen-xl py-10 mx-auto space-y-4 overflow-hidden md:space-y-6">
      <!-- Logo  -->
      <div class="flex flex-col items-center justify-between space-y-4 md:flex-row">
        <NuxtLink class="flex items-center space-x-3" to="/dashboard">
          <Logo />
          <p class="text-lg font-medium uppercase dark:text-gray-50">Kut</p>
        </NuxtLink>

        <div class="order-1 w-auto cursor-pointer">
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
        </div>
      </div>

      <!-- System health row  -->
      <div class="flex flex-col items-center justify-between space-y-4 md:flex-row">
        <div
          class="flex flex-row items-center order-1 px-4 py-2 space-x-3 text-sm border rounded dark:border-gray-700 md:order-2"
        >
          <span class="text-gray-900 dark:text-gray-200">Status:</span>
          <div class="w-2 h-2 rounded-full bg-success"></div>
          <span class="text-success"> System Healthy </span>
        </div>

        <div class="order-2 md:order-3">
          <NuxtLink class="text-gray-500 cursor-pointer hover:text-gray-400">
            <Icon name="iconoir:github" size="24" />
          </NuxtLink>
        </div>

        <div class="order-3 md:order-1">
          <p class="text-sm text-center text-gray-400">&copy; 2020 Kut. All rights reserved.</p>
        </div>
      </div>
    </div>
  </footer>
</template>
