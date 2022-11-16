<script lang="ts" setup>
import Logo from 'components/atoms/logo.vue'
import PrimaryButton from 'components/atoms/buttons/primary-button.vue'
import SecondaryButton from 'components/atoms/buttons/secondary-button.vue'
</script>

<template>
  <header class="fixed z-50 w-full px-4 border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
    <div class="flex flex-row items-center justify-between max-w-screen-xl h-16 mx-auto">
      <NuxtLink class="flex items-center space-x-3" to="/">
        <Logo />

        <p class="text-lg font-medium uppercase dark:text-gray-50">Kut</p>
      </NuxtLink>
      <div class="flex flex-row w-auto space-x-4">
        <NuxtLink to="/auth/login">
          <secondary-button class="w-auto">Login</secondary-button>
        </NuxtLink>
        <NuxtLink to="/auth/register">
          <primary-button class="w-auto">Sign up</primary-button>
        </NuxtLink>
      </div>
      <!-- <div v-else>
        <NuxtLink to="/dashboard">
          <primary-button class="w-auto">Dashboard</primary-button>
        </NuxtLink>
      </div> -->
    </div>
  </header>
</template>
