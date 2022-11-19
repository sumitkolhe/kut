<script lang="ts" setup>
import PrimaryButton from 'components/atoms/buttons/primary-button.vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from 'store/auth.store'
definePageMeta({
  layout: 'public',
  middleware: ['auth'],
})

const { resendVerificationEmail } = useAuthStore()
const { user } = storeToRefs(useAuthStore())
</script>

<template>
  <div
    class="flex flex-col items-center justify-center w-full min-h-screen py-6 overflow-hidden bg-gray-100 sm:py-12"
  >
    <div class="max-w-xl p-16 px-6 text-center bg-gray-100 rounded-md md:border md:bg-white">
      <div class="mb-2 text-4xl font-bold md:text-2xl text-zinc-800">
        <p>Check your inbox</p>
      </div>
      <p class="mb-2 text-lg text-zinc-500">
        We’ve sent you a verification link to the email address
        <span class="font-medium text-red-500"> {{ user.email }} </span>
      </p>

      <div class="flex flex-col items-center mx-12">
        <primary-button class="w-auto mt-6" @click="resendVerificationEmail()">
          Resend Verification Email
        </primary-button>
      </div>
    </div>
  </div>
</template>
