<script lang="ts" setup>
import BaseButton from '~~/src/components/atoms/buttons/primary-button.vue'
const { isDrawerVisible } = useDrawer()
</script>

<template>
  <Teleport to="body">
    <Transition name="slide-fade">
      <aside
        v-show="isDrawerVisible"
        class="flex-col md:hidden z-[999999] flex h-screen w-full fixed bg-gray-50 dark:bg-gray-900"
      >
        <div class="h-16 dark:bg-gray-900 bg-gray-50">header</div>

        <section class="h-screen flex border-t dark:border-gray-700">
          <div class="flex flex-col w-full p-4 space-y-3">
            <BaseButton type="secondary">Login</BaseButton>
            <BaseButton>Register</BaseButton>
          </div>
        </section>
      </aside>
    </Transition>
  </Teleport>
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
