<script lang="ts" setup>
import { useAuthStore } from 'store/auth.store'
import { storeToRefs } from 'pinia'
import PrimaryButton from 'components/atoms/buttons/primary-button.vue'
import SecondaryButton from 'components/atoms/buttons/secondary-button.vue'

definePageMeta({
  layout: 'public',
  auth: 'guest',
  middleware: () => {
    const { user } = storeToRefs(useAuthStore())

    if (user.value?.email) navigateTo('/dashboard')
  },
})

const features = [
  {
    title: 'Self Host',
    icon: 'ph:cloud',
    description: 'Use Kut as it is or host your own instance easily.',
  },
  {
    title: 'Free',
    icon: 'ph:coin',
    description: 'Kut is completely free to use.',
  },
  {
    title: 'Analytics that matter',
    icon: 'ph:chart-bar',
    description:
      'Kut provides powerful analytics for your links, including geolocation, device, browser, and referrer information.',
  },
  {
    title: 'Powerful link builder',
    icon: 'ph:link',
    description:
      'Build your links with UTM parameters, password protection, expiration dates, iOS/Android targeting, etc.',
  },
  {
    title: 'Free QR Code',
    icon: 'ph:qr-code',
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
          class="animate-text leading-tighter bg-gradient-to-r from-amber-500 via-red-500 to-purple-500 bg-clip-text text-transparent"
        >
          URL Shortener
        </h1>
        <h1 class="leading-tighter dark:text-gray-50">you need.</h1>
      </div>

      <p class="my-14 max-w-3xl text-center text-xl font-light text-gray-500 lg:text-2xl">
        Kut is an open-source, modern link shortening and management service to easily create,
        manage and track short links.
      </p>

      <div class="flex flex-wrap justify-center md:space-x-4">
        <NuxtLink to="/auth/register" class="p-2">
          <primary-button
            prefix-icon="octicon:paper-airplane-24"
            class="h-12 w-44 drop-shadow-xl"
            type="primary"
          >
            Start for free
          </primary-button>
        </NuxtLink>
        <a href="https://docs.krat.es" target="_blank" class="p-2">
          <secondary-button prefix-icon="ph:star" class="h-12 w-44 drop-shadow-xl" type="normal">
            Star on github
          </secondary-button>
        </a>
      </div>
    </div>

    <div class="my-6 flex max-w-screen-xl flex-col items-center justify-center md:my-20">
      <h2 class="text-center text-3xl font-bold md:text-4xl lg:text-5xl">
        All the features you need.
      </h2>
      <p class="my-4 text-center text-lg text-gray-600 md:text-xl">
        Everything you need to create unlimited short links and share them on every platform.
      </p>

      <div class="my-6 grid grid-cols-1 gap-6 md:my-12 md:grid-cols-2 md:gap-12 lg:grid-cols-3">
        <div
          v-for="feature in features"
          :key="feature.title"
          class="flex flex-col items-center rounded-md border p-6 hover:shadow-lg"
        >
          <icon :name="feature.icon" size="40" class="m-2" />

          <h4 class="mb-2 mt-4 text-lg font-medium">{{ feature.title }}</h4>
          <p class="text-center font-normal text-gray-500">
            {{ feature.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
