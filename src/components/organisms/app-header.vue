<script lang="ts" setup>
import Logo from 'components/atoms/logo.vue'
import PrimaryButton from 'components/atoms/buttons/primary-button.vue'
import SecondaryButton from 'components/atoms/buttons/secondary-button.vue'
import { useAuthStore } from 'store/auth.store'
import { storeToRefs } from 'pinia'

const route = useRoute()
const { user } = storeToRefs(useAuthStore())

const { y } = useWindowScroll()
</script>

<template>
  <header
    :class="[y >= 10 ? 'bg-opacity-50 shadow backdrop-blur transition-all duration-200' : '']"
    class="fixed z-50 w-full border-b bg-gray-50 px-6 dark:border-gray-700 dark:bg-gray-900"
  >
    <div class="mx-auto flex h-16 max-w-screen-xl flex-row items-center justify-between">
      <nuxt-link class="flex items-center space-x-3" to="/">
        <logo />
      </nuxt-link>

      <div v-if="user?.email">
        <nuxt-link to="/dashboard">
          <primary-button class="w-auto">Dashboard</primary-button>
        </nuxt-link>
      </div>

      <div v-else class="flex w-auto flex-row space-x-4">
        <nuxt-link
          v-if="route.path.includes('/auth/register') || route.path === '/'"
          to="/auth/login"
        >
          <secondary-button class="w-auto">Login</secondary-button>
        </nuxt-link>
        <nuxt-link
          v-if="route.path.includes('/auth/login') || route.path === '/'"
          to="/auth/register"
        >
          <primary-button class="w-auto">Sign up</primary-button>
        </nuxt-link>
      </div>
    </div>
  </header>
</template>
