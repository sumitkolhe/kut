<script lang="ts" setup>
import Logo from 'components/atoms/logo.vue'
import PrimaryButton from 'components/atoms/buttons/primary-button.vue'
import SecondaryButton from 'components/atoms/buttons/secondary-button.vue'
</script>

<template>
  <header class="fixed z-50 w-full border-b bg-gray-50 px-4 dark:border-gray-700 dark:bg-gray-900">
    <div class="mx-auto flex h-16 max-w-screen-xl flex-row items-center justify-between">
      <NuxtLink class="flex items-center space-x-3" to="/">
        <Logo />

        <p class="text-lg font-medium uppercase dark:text-gray-50">Kut</p>
      </NuxtLink>
      <div class="flex w-auto flex-row space-x-4">
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
