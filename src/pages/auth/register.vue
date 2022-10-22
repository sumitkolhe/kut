<script lang="ts" setup>
import BaseButton from 'components/atoms/base-button.vue'
import BaseInput from 'components/molecules/base-input.vue'
definePageMeta({
  layout: 'public',
})

const { createAccountPoints } = useAppConfig()
</script>

<template>
  <section
    class="mx-auto h-screen flex flex-row items-center justify-center space-x-32 max-w-screen-xl"
  >
    <!-- <header class="flex items-center justify-center py-5 mb-5 border-b border-gray-200 space-x-2">
      <icon name="ph:link-break" size="36" class="text-red-500" />
      <p class="text-xl font-medium text-red-500 uppercase">Kut</p>
    </header> -->

    <div class="w-1/2 bg-gray-50 py-12 px-8 rounded-md">
      <h1 class="text-xl font-medium text-center text-gray-800">Create a new account</h1>

      <form class="mt-8 space-y-4">
        <base-input label="First Name" type="text" placeholder="john" suffix-icon="ph:at" />
        <base-input label="Last Name" type="text" placeholder="doe" suffix-icon="ph:at" />
        <base-input label="Email" type="email" placeholder="john@doe.com" suffix-icon="ph:at" />
        <base-input
          label="Password"
          type="password"
          placeholder="********"
          suffix-icon="ph:password"
        />
        <base-button> Sign up</base-button>
      </form>

      <p class="text-center text-gray-600 mt-4">
        Already have an account?
        <nuxt-link to="/login" class="text-red-500 hover:text-red-600 hover:underline"
          >Sign in</nuxt-link
        >
      </p>
    </div>

    <div class="space-y-10 w-1/2">
      <a href="/" title="Go to Kutty Home Page">
        <span class="sr-only">Kutty Home Page</span>
      </a>
      <div
        v-for="feature in createAccountPoints"
        :key="feature.title"
        class="flex space-x-3 items-start text-red-500"
      >
        <Icon name="ph:check-circle-duotone" size="32" />
        <div>
          <h2 class="text-xl font-medium text-black">{{ feature.title }}</h2>
          <p class="mt-1 text-black">
            {{ feature.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
