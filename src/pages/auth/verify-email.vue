<script lang="ts" setup>
import BaseButton from 'components/atoms/base-button.vue'
definePageMeta({
  layout: 'public',
  middleware: ['auth'],
})

const { $auth } = useNuxtApp()
</script>

<template>
  <div
    class="w-full flex min-h-screen flex-col items-center justify-center overflow-hidden py-6 sm:py-12 bg-gray-100"
  >
    <ClientOnly>
      <div class="max-w-xl px-6 text-center rounded-md bg-gray-100 md:border p-16 md:bg-white">
        <div class="mb-2 text-4xl md:text-2xl font-bold text-zinc-800">
          <p>Check your inbox</p>
        </div>
        <p class="mb-2 text-lg text-zinc-500">
          We’ve sent you a verification link to the email address
          <span class="font-medium text-red-500"> {{ $auth.user.value.email }} </span>
        </p>

        <div class="flex flex-col mx-12 items-center">
          <BaseButton class="mt-6 w-auto" type="secondary" @click="$auth.resendVerificationEmail()">
            Resend Verification Email
          </BaseButton>
          <BaseButton class="mt-6 w-auto" @click="$router.push('/dashboard')">
            Go to app
          </BaseButton>
        </div>
      </div>
    </ClientOnly>
  </div>
</template>