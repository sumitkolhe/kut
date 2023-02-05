<script lang="ts" setup>
const router = useRouter()
const { isDrawerVisible } = useDrawer()

const navItems = [
  {
    title: 'Log in',
    icon: 'ph:sign-in',
    action: () => router.push('/dashboard'),
  },
  {
    title: 'Sign up',
    icon: 'ph:user-circle',
    action: () => router.push('/dashboard/settings'),
  },
  {
    title: 'Github',
    icon: 'iconoir:github',
    action: () => navigateTo('https://github.com/sumitkolhe/kut', { external: true }),
  },
]
</script>

<template>
  <client-only>
    <teleport to="body">
      <transition name="slide-fade">
        <aside
          v-show="isDrawerVisible"
          class="fixed inset-0 top-16 z-50 flex h-screen w-full flex-col overflow-y-hidden bg-gray-50 py-4 px-6 dark:bg-gray-900 md:hidden"
        >
          <div
            v-for="item in navItems"
            :key="item.title"
            class="text-md flex cursor-pointer items-center space-x-4 border-b px-2 py-4 font-normal hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
            @click="item.action"
          >
            <icon :name="item.icon" size="20" />
            <p>{{ item.title }}</p>
          </div>
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
