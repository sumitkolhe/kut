<script lang="ts" setup>
import Logo from 'components/atoms/logo.vue'
import ThemeSwitch from 'components/molecules/theme-switch.vue'
</script>

<template>
  <footer class="bottom-0 w-full border-t bg-white px-4 dark:border-gray-700 dark:bg-gray-900">
    <div class="mx-auto flex max-w-screen-xl flex-col space-y-4 overflow-hidden py-10 md:space-y-6">
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
          class="order-1 flex flex-row items-center space-x-3 rounded border px-4 py-2 text-sm dark:border-gray-700 md:order-2"
        >
          <span class="text-gray-900 dark:text-gray-200">Status:</span>
          <div class="bg-success h-2 w-2 rounded-full"></div>
          <span class="text-success"> System Healthy </span>
        </div>

        <div class="order-2 md:order-3">
          <NuxtLink class="cursor-pointer text-gray-500 hover:text-gray-400">
            <Icon name="iconoir:github" size="24" />
          </NuxtLink>
        </div>

        <div class="order-3 md:order-1">
          <p class="text-center text-sm text-gray-400">&copy; 2020 Kut. All rights reserved.</p>
        </div>
      </div>
    </div>
  </footer>
</template>
