<script lang="ts" setup>
import Logo from 'components/atoms/logo.vue'
import ProfileMenu from 'components/molecules/menus/profile-menu.vue'
import ThemeSwitch from 'components/molecules/theme-switch.vue'
import DrawerSwitch from 'components/molecules/drawer-switch.vue'
import PrimaryButton from 'components/atoms/buttons/primary-button.vue'
import { useAuthStore } from 'store/auth.store'
import { storeToRefs } from 'pinia'
import {
  Dialog,
  DialogDescription,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'

const { resendVerificationEmail } = useAuthStore()
const { user } = storeToRefs(useAuthStore())

const loading = ref(false)

const resendEmail = async () => {
  loading.value = true

  const { error } = await resendVerificationEmail()

  if (error) {
    loading.value = false
    return createToast(error, { type: 'error' })
  }

  loading.value = false
}
</script>

<template>
  <header class="w-full bg-gray-50 px-6 dark:bg-gray-900">
    <div class="mx-auto flex h-16 max-w-screen-xl flex-row items-center justify-between">
      <div class="flex items-center space-x-6">
        <nuxt-link class="flex items-center space-x-3" to="/dashboard">
          <logo />
        </nuxt-link>
      </div>

      <div class="flex space-x-6">
        <theme-switch />
        <profile-menu class="hidden md:block" />
        <drawer-switch />
      </div>
    </div>

    <client-only>
      <aside>
        <TransitionRoot appear :show="user?.isVerified === false" as="template">
          <Dialog as="div" class="relative z-50">
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0"
              enter-to="opacity-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100"
              leave-to="opacity-0"
            >
              <div class="fixed inset-0 bg-black bg-opacity-25" />
            </TransitionChild>

            <div
              class="fixed inset-0 flex min-h-full items-center justify-center overflow-y-auto p-4 text-center"
            >
              <TransitionChild
                as="template"
                enter="duration-300 ease-out"
                enter-from="opacity-0 scale-95"
                enter-to="opacity-100 scale-100"
                leave="duration-200 ease-in"
                leave-from="opacity-100 scale-100"
                leave-to="opacity-0 scale-95"
              >
                <DialogPanel
                  class="flex max-w-lg flex-col items-center justify-center space-y-6 rounded-md bg-gray-100 p-8 text-center shadow-2xl"
                >
                  <DialogTitle class="text-xl font-medium"> Check your inbox </DialogTitle>

                  <DialogDescription>
                    We’ve sent you a verification link to the email address
                    <span class="text-red-500">{{ user?.email }}</span>
                  </DialogDescription>

                  <primary-button :loading="loading" class="w-fit" @click="resendEmail()">
                    Resend Verification Email
                  </primary-button>
                </DialogPanel>
              </TransitionChild>
            </div>
          </Dialog>
        </TransitionRoot>
      </aside>
    </client-only>
  </header>
</template>
