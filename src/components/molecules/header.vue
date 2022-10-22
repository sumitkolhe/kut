<script lang="ts" setup>
import BaseButton from 'components/atoms/base-button.vue'
</script>

<template>
  <header
    class="fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out bg-white backdrop-blur-sm shadow-lg"
  >
    <div class="max-w-6xl mx-auto px-5 sm:px-6">
      <div class="flex items-center justify-between h-16 md:h-20">
        <div class="flex-shrink-0 mr-4">
          <NuxtLink to="/" class-name="block" aria-label="Cruip">
            <svg class="w-8 h-8" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <radialGradient
                  id="header-logo"
                  cx="21.152%"
                  cy="86.063%"
                  fx="21.152%"
                  fy="86.063%"
                  r="79.941%"
                >
                  <stop stopColor="#4FD1C5" offset="0%" />
                  <stop stopColor="#81E6D9" offset="25.871%" />
                  <stop stopColor="#338CF5" offset="100%" />
                </radialGradient>
              </defs>
              <rect width="32" height="32" rx="16" fill="url(#header-logo)" fillRule="nonzero" />
            </svg>
          </NuxtLink>
        </div>

        <nav class="flex flex-grow">
          <ul class="flex flex-grow justify-end flex-wrap items-center space-x-4">
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
        </nav>
      </div>
    </div>
  </header>
</template>
