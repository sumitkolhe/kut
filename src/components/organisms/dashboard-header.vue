<script lang="ts" setup>
import Logo from 'components/atoms/logo.vue'
import ProfileMenu from 'components/molecules/menus/profile-menu.vue'
import { useAuthStore } from 'store/auth.store'
import { storeToRefs } from 'pinia'
import DrawerSwitch from 'components/molecules/switch/drawer-switch.vue'
import ThemeSwitch from 'components/molecules/switch/theme-switch.vue'

const toast = useToast()
const { resendVerificationEmail } = useAuthStore()
const { user } = storeToRefs(useAuthStore())

const loading = ref(false)
const needsVerification = ref(user.value?.isVerified === false)

const resendEmail = async () => {
  loading.value = true

  const { error } = await resendVerificationEmail()

  if (error) {
    loading.value = false

    return toast.add({ title: error, color: 'red' })
  } else {
    toast.add({ title: 'Verification email sent successfully', color: 'green' })
  }

  loading.value = false
}
</script>

<template>
  <header class="bg-primary-50 dark:bg-primary-900 w-full px-4">
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
      <u-modal :model-value="needsVerification">
        <div
          class="bg-primary-100 dark:text-primary-800 flex max-w-lg flex-col items-center justify-center space-y-6 rounded-md p-8 text-center shadow-2xl"
        >
          <p class="text-xl font-medium">Check your inbox</p>

          <div>
            We’ve sent you a verification link to the email address
            <span class="text-red-500">{{ user?.email }}</span>
          </div>

          <u-button :loading="loading" @click="resendEmail()"> Resend Verification Email </u-button>
        </div>
      </u-modal>
    </client-only>
  </header>
</template>
