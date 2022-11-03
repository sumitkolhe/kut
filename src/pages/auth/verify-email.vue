<script lang="ts" setup>
import PrimaryButton from 'components/atoms/buttons/primary-button.vue'
import SecondaryButton from 'components/atoms/buttons/secondary-button.vue'
definePageMeta({
  middleware: ['auth'],
})

const { $auth } = useNuxtApp()
</script>

<template>
  <div
    class="flex flex-col items-center justify-center w-full min-h-screen py-6 overflow-hidden bg-gray-100 sm:py-12"
  >
    <client-only>
      <div class="max-w-xl p-16 px-6 text-center bg-gray-100 rounded-md md:border md:bg-white">
        <div class="mb-2 text-4xl font-bold md:text-2xl text-zinc-800">
          <p>Check your inbox</p>
        </div>
        <p class="mb-2 text-lg text-zinc-500">
          We’ve sent you a verification link to the email address
          <span class="font-medium text-red-500"> {{ $auth.user.value.email }} </span>
        </p>

        <div class="flex flex-col items-center mx-12">
          <primary-button class="w-auto mt-6" @click="$auth.resendVerificationEmail()">
            Resend Verification Email
          </primary-button>
          <secondary-button class="w-auto mt-6" @click="$router.push('/dashboard')">
            Go to app
          </secondary-button>
        </div>
      </div>
    </client-only>
  </div>
</template>
