<script lang="ts" setup>
import PrimaryButton from 'components/atoms/button/primary-button.vue'
import { useAuthStore } from 'store/auth.store'

const { logout } = useAuthStore()
const { isDrawerVisible, toggleDrawer } = useDrawer()

const navItems = [
  {
    title: 'Dashboard',
    icon: 'ph:house-simple',
    target: { link: '/dashboard', external: false },
  },
  {
    title: 'Settings',
    icon: 'lucide:settings-2',
    target: { link: '/dashboard/settings', external: false },
  },
  {
    title: 'Github',
    icon: 'iconoir:github',
    target: { link: 'https://github.com/sumitkolhe/kut', external: true },
  },
]

const drawerAction = (target: { link: string; external: boolean }) => {
  const { link, external } = target

  if (external === true) {
    navigateTo(link, { external })
  } else {
    const router = useRouter()

    setTimeout(() => {
      toggleDrawer()
    }, 100)
    router.push(link)
  }
}
</script>

<template>
  <client-only>
    <teleport to="body">
      <transition name="slide-fade">
        <aside
          v-show="isDrawerVisible"
          class="fixed inset-0 top-16 z-50 flex h-screen w-full flex-col overflow-y-hidden bg-gray-50 px-6 py-4 dark:bg-gray-900 md:hidden"
        >
          <div
            v-for="item in navItems"
            :key="item.title"
            class="text-md flex cursor-pointer items-center space-x-4 border-b px-2 py-4 font-normal hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
            @click="drawerAction(item.target)"
          >
            <icon :name="item.icon" size="20" />
            <p>{{ item.title }}</p>
          </div>

          <primary-button class="my-6" @click="logout">Logout</primary-button>
        </aside>
      </transition>
    </teleport>
  </client-only>
</template>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.2s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(0.5, 0.5, 0.5, 0.5);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(5px);
  opacity: 0;
}
</style>
