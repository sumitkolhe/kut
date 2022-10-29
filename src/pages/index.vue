<script lang="ts" setup>
import BaseButton from 'components/atoms/base-button.vue'
definePageMeta({
  layout: 'public',
  middleware: ['auth'],
})

const { $auth } = useNuxtApp()

const isLoggedIn = computed(() => ($auth.user.value.email ? true : false))
</script>

<template>
  <div class="flex flex-col min-h-screen overflow-hidden">
    <ClientOnly>
      <header
        class="fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out bg-white backdrop-blur-sm shadow-lg"
      >
        <div class="max-w-6xl mx-auto px-5 sm:px-6">
          <div class="flex items-center justify-between h-16 md:h-20">
            <div class="flex-shrink-0 mr-4 flex items-center space-x-2">
              <NuxtLink to="/" class-name="block" aria-label="Cruip">
                <icon name="ph:link-break" size="36" class="text-red-500" />
              </NuxtLink>
              <p class="text-xl font-medium">trym</p>
            </div>

            <nav class="flex flex-grow">
              <ul
                v-if="!isLoggedIn"
                class="flex flex-grow justify-end flex-wrap items-center space-x-4"
              >
                <li>
                  <NuxtLink to="/auth/login">
                    <base-button type="secondary"> Login </base-button>
                  </NuxtLink>
                </li>

                <li>
                  <NuxtLink to="/auth/register">
                    <base-button suffix-icon="material-symbols:arrow-forward-rounded">
                      Register
                    </base-button>
                  </NuxtLink>
                </li>
              </ul>

              <ul v-else class="flex flex-grow justify-end flex-wrap items-center space-x-4">
                <li>
                  <NuxtLink to="/dashboard">
                    <base-button suffix-icon="material-symbols:arrow-forward-rounded">
                      Dashboard
                    </base-button>
                  </NuxtLink>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
    </ClientOnly>
    <!-- <main class="flex-grow">
      <HeroHome />
      <FeaturesHome />
      <FeaturesBlocks />
      <Testimonials />
      <Newsletter />
    </main>

    <Footer /> -->
  </div>
</template>
