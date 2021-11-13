<template>
  <header
    class="
      fixed
      w-full
      z-30
      bg-geist-background
      md:opacity-90
      border-b border-accent2
    "
  >
    <div class="max-w-5xl mx-auto px-4">
      <div class="flex items-center justify-between h-16 md:h-20">
        <div class="flex-shrink-0">
          <NuxtLink
            to="/"
            class="
              inline-flex
              cursor-pointer
              items-center
              justify-center
              border border-transparent
              text-accent8
            "
            aria-label="logo"
          >
            <package-icon class="h-10 w-10" />

            <p class="text-2xl font-bold pl-4">TRYM</p>
          </NuxtLink>
        </div>

        <div class="inline-flex">
          <NuxtLink to="/auth/login" class="mx-4">
            <zi-button auto> Login </zi-button>
          </NuxtLink>

          <NuxtLink to="/dashboard" class="mx-4">
            <zi-button auto> Dash </zi-button>
          </NuxtLink>
          <!-- <NuxtLink to="/auth/register">
            <zi-button type="primary" auto> Signup </zi-button>
          </NuxtLink> -->
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({})
</script>
