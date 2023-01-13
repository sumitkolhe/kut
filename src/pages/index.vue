<script lang="ts" setup>
import { useAuthStore } from 'store/auth.store'
import { storeToRefs } from 'pinia'
import PrimaryButton from 'components/atoms/buttons/primary-button.vue'
import SecondaryButton from 'components/atoms/buttons/secondary-button.vue'

definePageMeta({
  layout: 'public',
  middleware: () => {
    const { isLoggedIn } = storeToRefs(useAuthStore())

    if (isLoggedIn.value) navigateTo('/dashboard')
  },
})
</script>

<template>
  <div
    class="flex min-h-screen flex-col space-y-6 overflow-hidden bg-white p-32 px-6 dark:bg-black"
  >
    <div class="mx-auto mt-10 max-w-5xl px-4">
      <div class="pb-12 md:pb-20">
        <div class="text-center">
          <h1
            class="leading-tighter mb-4 text-5xl font-bold tracking-tight dark:text-white md:text-6xl"
            data-aos="zoom-y-out"
          >
            The only
          </h1>
          <h1
            class="leading-tighter mb-2 bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 bg-clip-text text-5xl font-bold tracking-tight text-transparent md:mb-4 md:text-6xl"
          >
            URL Shortener
          </h1>
          <h1
            class="leading-tighter mb-4 text-5xl font-bold leading-tight tracking-tight dark:text-white md:text-6xl"
          >
            you'll ever need
          </h1>
          <div class="mx-auto my-14 max-w-3xl">
            <p class="mb-8 text-lg text-gray-500 sm:text-xl">
              Kut is an open-source link management tool for modern marketing teams to create,
              share, and track short links.
            </p>

            <div class="flex flex-wrap justify-center space-x-4 sm:mt-20">
              <NuxtLink to="/auth/register" class="p-2">
                <primary-button
                  prefix-icon="octicon:paper-airplane-24"
                  class="py-4 drop-shadow-xl"
                  type="primary"
                >
                  Start for free
                </primary-button>
              </NuxtLink>
              <a href="https://docs.krat.es" target="_blank" class="p-2">
                <secondary-button prefix-icon="ph:star" class="py-4 drop-shadow-xl" type="normal">
                  Star on github
                </secondary-button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
