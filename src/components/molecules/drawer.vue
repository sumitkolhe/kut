<script lang="ts" setup>
import PrimaryButton from 'components/atoms/buttons/primary-button.vue'
import SecondaryButton from 'components/atoms/buttons/secondary-button.vue'

const { isDrawerVisible } = useDrawer()
</script>

<template>
  <teleport to="body">
    <aside
      v-show="isDrawerVisible"
      class="flex-col md:hidden z-[999999] flex h-screen w-full fixed bg-gray-50 dark:bg-gray-900"
    >
      <div class="h-16 dark:bg-gray-900 bg-gray-50">header</div>

      <section class="flex h-screen border-t dark:border-gray-700">
        <div class="flex flex-col w-full p-4 space-y-3">
          <secondary-button>Login</secondary-button>
          <primary-button>Register</primary-button>
        </div>
      </section>
    </aside>
  </teleport>
</template>
