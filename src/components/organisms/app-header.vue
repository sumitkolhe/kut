<script lang="ts" setup>
import Logo from 'components/atoms/logo.vue'
import ThemeSwitch from 'components/molecules/switch/theme-switch.vue'
import DrawerSwitch from 'components/molecules/switch/drawer-switch.vue'

const route = useRoute()

const { y } = useWindowScroll()
</script>

<template>
  <header
    :class="[
      y >= 10
        ? 'border-b bg-opacity-50 backdrop-blur transition-all duration-200 dark:bg-opacity-50'
        : '',
    ]"
    class="bg-primary-50 dark:border-primary-700 dark:bg-primary-900 fixed z-50 w-full px-6"
  >
    <div class="mx-auto flex h-16 max-w-screen-xl flex-row items-center justify-between">
      <nuxt-link class="flex items-center space-x-3" to="/">
        <logo />
      </nuxt-link>

      <div class="flex items-center space-x-8">
        <div class="flex space-x-6">
          <theme-switch />
          <drawer-switch />
        </div>

        <div class="hidden md:flex">
          <div class="flex w-auto flex-row space-x-4">
            <u-button
              v-if="route.path.includes('/auth/register') || route.path === '/'"
              to="/auth/login"
              variant="outline"
            >
              Login
            </u-button>

            <u-button
              v-if="route.path.includes('/auth/login') || route.path === '/'"
              to="/auth/register"
            >
              Sign up
            </u-button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
