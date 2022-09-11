<script lang="ts" setup></script>

<template>
  <section class="bg-gray-50 h-screen mx-auto">
    <header class="flex items-center justify-center py-5 mb-5 border-b border-gray-200 space-x-2">
      <Icon name="ph:link-break" size="36" class="text-red-500" />
      <p class="text-xl font-medium text-red-500 uppercase">Trym</p>
    </header>
    <div class="w-full md:border max-w-lg mx-auto px-6 pt-6 pb-8 rounded-md bg-gray-50 md:bg-white md:mt-24">
      <h1 class="text-xl font-medium text-center text-gray-800">Create a new account</h1>

      <form class="mt-8 space-y-6">
        <div class="w-full space-y-1">
          <label for="icon-suffix" class="text-sm text-gray-500">Email</label>
          <div class="relative">
            <input
              id="icon-suffix"
              type="email"
              placeholder="john@doe.com"
              class="block placeholder:text-gray-400 w-full rounded border-gray-200 pr-9 text-sm transition focus:border-black focus:ring-black disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-75"
            />
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5">
              <Icon name="ph:at" size="20" class="text-gray-600" />
            </div>
          </div>
        </div>

        <div class="w-full space-y-1">
          <label for="icon-prefix" class="text-sm text-gray-500">Password</label>
          <div class="relative">
            <input
              id="icon-prefix"
              type="email"
              placeholder="*********"
              class="block w-full rounded placeholder:text-gray-400 border-gray-200 pr-9 text-sm transition focus:border-black focus:ring-black disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-75"
            />
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5">
              <Icon name="ph:password" size="20" class="text-gray-600" />
            </div>
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              class="h-4 w-4 rounded border-gray-900 text-black focus:border-black focus:ring-black"
            />
            <label for="remember-me" class="ml-2 block text-sm text-gray-600">Remember me</label>
          </div>

          <div class="text-sm">
            <NuxtLink class="hover:underline text-red-500">Forgot your password?</NuxtLink>
          </div>
        </div>

        <button
          type="button"
          class="inline-flex w-full cursor-pointer tracking-wide select-none appearance-none items-center justify-center space-x-1 rounded-md border border-gray-200 bg-black px-3 py-2 text-white transition hover:border-black hover:text-black hover:bg-white focus:outline-none active:bg-gray-100"
        >
          Sign up
        </button>
      </form>
      <p class="text-center text-gray-600 mt-4">
        Already have an account?
        <a href="#" class="text-red-500 hover:text-red-600 hover:underline">Sign in</a>
      </p>
    </div>
  </section>
</template>
