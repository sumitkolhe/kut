<script lang="ts" setup>
import Logo from 'components/atoms/logo.vue'
</script>

<template>
  <footer
    class="bg-primary-50 dark:border-primary-700 dark:bg-primary-900 z-50 w-full border-t px-6"
  >
    <div
      class="mx-auto flex max-w-screen-xl flex-row items-center justify-between overflow-hidden py-4"
    >
      <div class="flex items-center space-x-4 md:space-x-6">
        <nuxt-link class="flex items-center" to="/dashboard">
          <logo />
        </nuxt-link>
        <p class="text-primary-400 text-center text-sm">&copy; 2020 Kut. All rights reserved.</p>
      </div>

      <nuxt-link
        to="https://github.com/sumitkolhe/kut"
        target="_blank"
        class="text-primary-900 hover:text-primary-400 cursor-pointer"
      >
        <icon name="iconoir:github" size="24" class="dark:text-primary-200" />
      </nuxt-link>
    </div>
  </footer>
</template>
