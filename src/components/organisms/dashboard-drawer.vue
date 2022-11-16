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
          class="flex-col md:hidden z-50 inset-0 flex h-screen w-full fixed bg-gray-50 dark:bg-gray-900 px-4"
        >
          <div class="dark:bg-gray-900 bg-gray-50 flex items-center justify-between">
            <NuxtLink class="flex items-center space-x-3" to="/dashboard">
              <Logo />
              <p class="font-medium uppercase text-lg dark:text-gray-50">Kut</p>
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
            <div class="flex flex-col w-full py-4 space-y-3">
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
