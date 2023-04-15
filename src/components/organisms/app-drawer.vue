<script lang="ts" setup>
const { isDrawerVisible, toggleDrawer } = useDrawer()

const navItems = [
  {
    title: 'Log in',
    icon: 'ph:sign-in',
    target: { link: '/auth/login', external: false },
  },
  {
    title: 'Sign up',
    icon: 'ph:user-circle',
    target: { link: '/auth/register', external: false },
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
        </aside>
      </transition>
    </teleport>
  </client-only>
</template>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(0.5, 0.5, 0.5, 0.5);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
}
</style>
