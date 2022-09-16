<script lang="ts" setup>
const { isDrawerVisible } = useDrawer()
</script>

<template>
  <Teleport to="body">
    <Transition name="slide-fade">
      <aside
        v-show="isDrawerVisible"
        class="flex-col md:hidden top-14 z-50 flex h-screen w-full fixed bg-gray-50 dark:bg-gray-900"
      >
        <section class="h-full flex shrink-0 border-b-[1px]">
          <!-- <div class="flex items-center justify-between flex-1 px-6">
            <span class="font-semibold"> Trym </span>

            <button type="button" title="Show Drawer" class="sm:hidden" @click="toggleDrawer()">
              <Icon size="24" name="line-md:close" />
            </button>
          </div> -->
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
