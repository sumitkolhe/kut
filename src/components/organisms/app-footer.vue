<script lang="ts" setup>
import Logo from 'components/atoms/logo.vue'
</script>

<template>
  <footer class="z-50 w-full border-t bg-gray-50 px-6 dark:border-gray-700 dark:bg-gray-900">
    <div
      class="mx-auto flex max-w-screen-xl flex-row items-center justify-between overflow-hidden py-4"
    >
      <div class="flex items-center space-x-6">
        <nuxt-link class="flex items-center" to="/dashboard">
          <logo />
          <p class="text-lg font-medium uppercase dark:text-gray-50">Kut</p>
        </nuxt-link>
        <p class="text-center text-sm text-gray-400">&copy; 2020 Kut. All rights reserved.</p>
      </div>

      <nuxt-link
        to="https://github.com/sumitkolhe/kut"
        target="_blank"
        class="cursor-pointer text-gray-900 hover:text-gray-400"
      >
        <icon name="iconoir:github" size="24" />
      </nuxt-link>
    </div>
  </footer>
</template>
