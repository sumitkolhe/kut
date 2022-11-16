<script lang="ts" setup>
import Logo from 'components/atoms/logo.vue'
import ThemeSwitch from 'components/molecules/theme-switch.vue'
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
          <theme-switch />
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
