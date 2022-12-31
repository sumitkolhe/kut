<script lang="ts" setup>
import PrimaryButton from 'components/atoms/buttons/primary-button.vue'
import SecondaryButton from 'components/atoms/buttons/secondary-button.vue'

const { isDrawerVisible } = useDrawer()
</script>

<template>
  <client-only>
    <teleport to="body">
      <transition name="slide-fade">
        <aside
          v-show="isDrawerVisible"
          class="fixed z-[500] flex h-screen w-full flex-col bg-gray-50 dark:bg-gray-900 md:hidden"
        >
          <div class="h-16 bg-gray-50 dark:bg-gray-900">header</div>

          <section class="flex h-screen border-t dark:border-gray-700">
            <div class="flex w-full flex-col space-y-3 p-4">
              <secondary-button>Login</secondary-button>
              <primary-button>Register</primary-button>
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
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
