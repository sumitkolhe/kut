<script lang="ts" setup>
import PrimaryButton from 'components/atoms/buttons/primary-button.vue'
import SecondaryButton from 'components/atoms/buttons/secondary-button.vue'
import ThemeSwitch from 'components/molecules/theme-switch.vue'
import Logo from 'components/atoms/logo.vue'

const { toggleDrawer, isDrawerVisible } = useDrawer()
</script>

<template>
  <client-only>
    <teleport to="body">
      <transition name="slide-fade">
        <aside
          v-show="isDrawerVisible"
          class="fixed inset-0 z-50 flex h-screen w-full flex-col bg-gray-50 px-4 dark:bg-gray-900 md:hidden"
        >
          <div class="flex items-center justify-between bg-gray-50 dark:bg-gray-900">
            <NuxtLink class="flex items-center space-x-3" to="/dashboard">
              <Logo />
              <p class="text-lg font-medium uppercase dark:text-gray-50">Kut</p>
            </NuxtLink>

            <Icon
              v-if="!isDrawerVisible"
              name="line-md:menu"
              class="dark:text-gray-50"
              size="24"
              @click="toggleDrawer()"
            />
            <Icon
              v-else
              name="line-md:close"
              size="24"
              class="dark:text-gray-50"
              @click="toggleDrawer()"
            />
          </div>
          <section class="flex h-screen dark:border-gray-700">
            <div class="flex w-full flex-col space-y-3 py-4">
              <secondary-button>New Link</secondary-button>
              <primary-button>Logout</primary-button>
              <theme-switch />
            </div>
          </section>
        </aside>
      </transition>
    </teleport>
  </client-only>
</template>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s;
}
.slide-fade-leave-active {
  transition: all 0.3s;
}
</style>
