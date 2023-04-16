<script lang="ts" setup>
import { useAuthStore } from 'store/auth.store'
import { storeToRefs } from 'pinia'
import PrimaryButton from 'components/atoms/button/primary-button.vue'

definePageMeta({
  layout: 'public',
  auth: 'guest',
  middleware: () => {
    const { isLoggedIn } = storeToRefs(useAuthStore())

    if (isLoggedIn.value && isLoggedIn.value === true) return navigateTo('/dashboard')
  },
})

const features = [
  {
    title: 'Self Host',
    icon: '/features/host-your-own.svg',
    description: 'Use Kut as it is or host your own instance easily.',
  },
  {
    title: 'Free',
    icon: '/features/free.svg',
    description: 'Kut is completely free to use.',
  },
  {
    title: 'Analytics that matter',
    icon: '/features/analytics.svg',
    description:
      'Kut provides powerful analytics for your links, including geolocation, device, browser, and referrer information.',
  },
  {
    title: 'Powerful link builder',
    icon: '/features/powerful-link-builder.svg',
    description:
      'Build your links with UTM parameters, password protection, expiration dates, iOS/Android targeting, etc.',
  },
  {
    title: 'Free QR Code',
    icon: '/features/qr-code.svg',
    description:
      "QR codes and short links are like peas in a pod. That's why we've built a QR code exporter right into Kut.",
  },
  {
    title: 'Open Source',
    icon: '/features/open-source.svg',
    description:
      "QR codes and short links are like peas in a pod. That's why we've built a QR code exporter right into Kut.",
  },
]
</script>

<template>
  <div class="flex flex-col items-center justify-center bg-gray-50 px-6 dark:bg-gray-900">
    <div class="my-32 flex max-w-screen-xl flex-col items-center text-center md:my-44">
      <div
        class="flex flex-col items-center justify-center space-y-4 text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl"
      >
        <h1 class="leading-tighter dark:text-gray-50">The only</h1>
        <h1
          class="leading-tighter animate-text bg-gradient-to-r from-amber-500 via-red-500 to-purple-500 bg-clip-text text-transparent"
        >
          URL Shortener
        </h1>
        <h1 class="leading-tighter dark:text-gray-50">you need.</h1>
      </div>

      <p class="my-14 max-w-3xl text-center text-xl font-light text-gray-500 lg:text-2xl">
        Kut is an open-source, modern link shortening and management service to easily create,
        manage and track short links.
      </p>

      <div
        class="flex w-full flex-col justify-center space-y-6 sm:max-w-lg md:flex-row md:space-x-8 md:space-y-0"
      >
        <nuxt-link to="/auth/register">
          <primary-button
            class="!rounded-md !py-[12px] px-8 drop-shadow-xl md:px-10 md:py-3"
            type="primary"
          >
            <span class="text-base"> Start for free </span>
          </primary-button>
        </nuxt-link>

        <nuxt-link href="https://github.com/sumitkolhe/kut" target="_blank">
          <div class="group relative">
            <div
              class="absolute -inset-1.5 animate-text rounded-lg bg-gradient-to-r from-amber-600 via-red-600 to-purple-600 opacity-60 blur-md transition duration-500 group-hover:opacity-80 group-hover:duration-200"
            ></div>
            <button
              class="relative w-full rounded-md border border-pink-500 bg-gray-50 px-8 py-[12px] hover:border-pink-700 dark:bg-gray-900 dark:text-gray-200 md:px-10 md:py-[12px]"
            >
              <p class="text-base">Star on github</p>
            </button>
          </div>
        </nuxt-link>
      </div>
    </div>

    <div class="my-6 flex max-w-screen-xl flex-col items-center justify-center md:my-20">
      <h2 class="text-center text-3xl font-bold dark:text-gray-200 md:text-4xl lg:text-5xl">
        All the features you need.
      </h2>
      <p class="my-4 text-center text-lg text-gray-600 md:text-xl">
        Everything you need to create unlimited short links and share them on every platform.
      </p>

      <div class="my-6 grid grid-cols-1 gap-6 md:my-12 md:grid-cols-2 md:gap-12 lg:grid-cols-3">
        <div
          v-for="feature in features"
          :key="feature.title"
          class="flex flex-col items-center rounded-md p-6"
        >
          <img
            :src="feature.icon"
            class="m-2 h-44 w-44 dark:text-gray-200 md:h-56 md:w-56 xl:h-64 xl:w-64"
          />

          <h4 class="mb-2 mt-4 text-lg font-medium dark:text-gray-100">{{ feature.title }}</h4>
          <p class="text-center font-normal text-gray-500">
            {{ feature.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
