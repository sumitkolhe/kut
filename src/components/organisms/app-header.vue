<script lang="ts" setup>
import Logo from 'components/atoms/logo.vue'
import PrimaryButton from 'components/atoms/buttons/primary-button.vue'
import SecondaryButton from 'components/atoms/buttons/secondary-button.vue'
import ThemeSwitch from 'components/molecules/theme-switch.vue'

const route = useRoute()
const { toggleDrawer, isDrawerVisible } = useDrawer()

const { y } = useWindowScroll()
</script>

<template>
  <header
    :class="[y >= 10 ? 'border-b bg-opacity-50 backdrop-blur transition-all duration-200' : '']"
    class="fixed z-50 w-full bg-gray-50 px-6 dark:border-gray-700 dark:bg-gray-900"
  >
    <div class="mx-auto flex h-16 max-w-screen-xl flex-row items-center justify-between">
      <nuxt-link class="flex items-center space-x-3" to="/">
        <logo />
      </nuxt-link>

      <div class="flex items-center space-x-6">
        <div class="flex space-x-6">
          <theme-switch />

          <div class="cursor-pointer md:hidden">
            <icon
              v-if="!isDrawerVisible"
              name="line-md:menu"
              class="dark:text-gray-300"
              size="24"
              @click="toggleDrawer()"
            />
            <icon
              v-else
              name="line-md:close"
              size="24"
              class="dark:text-gray-300"
              @click="toggleDrawer()"
            />
          </div>
        </div>

        <div class="hidden md:flex">
          <div class="flex w-auto flex-row space-x-4">
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
      </div>
    </div>
  </header>
</template>
