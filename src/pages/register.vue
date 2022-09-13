<script lang="ts" setup>
definePageMeta({
  layout: 'public',
})
</script>

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

        <button
          type="button"
          class="inline-flex w-full cursor-pointer tracking-wide select-none appearance-none items-center justify-center space-x-1 rounded-md border border-gray-200 bg-black px-3 py-2 text-white transition hover:border-black hover:text-black hover:bg-white focus:outline-none active:bg-gray-100"
        >
          Sign up
        </button>
      </form>
      <p class="text-center text-gray-600 mt-4">
        Already have an account?
        <NuxtLink to="/login" class="text-red-500 hover:text-red-600 hover:underline">Sign in</NuxtLink>
      </p>
    </div>

    <!--
  Welcome to Tailwind Play, the official Tailwind CSS playground!

  Everything here works just like it does when you're running Tailwind locally
  with a real build pipeline. You can customize your config file, use features
  like `@apply`, or even add third-party plugins.

  Feel free to play with this example if you're just learning, or trash it and
  start from scratch if you know enough to be dangerous. Have fun!
-->
    <div class="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
      <div
        class="relative bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10"
      >
        <div class="mx-auto max-w-md">
          <div class="divide-y divide-gray-300/50">
            <div class="space-y-6 py-8 text-base leading-7 text-gray-600">
              <p>An advanced online playground for Tailwind CSS, including support for things like:</p>
              <ul class="space-y-4">
                <li class="flex items-center">
                  <svg
                    class="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <circle cx="12" cy="12" r="11" />
                    <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
                  </svg>
                  <p class="ml-4">
                    Customizing your
                    <code class="text-sm font-bold text-gray-900">tailwind.config.js</code> file
                  </p>
                </li>
                <li class="flex items-center">
                  <svg
                    class="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <circle cx="12" cy="12" r="11" />
                    <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
                  </svg>
                  <p class="ml-4">
                    Extracting classes with
                    <code class="text-sm font-bold text-gray-900">@apply</code>
                  </p>
                </li>
                <li class="flex items-center">
                  <svg
                    class="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <circle cx="12" cy="12" r="11" />
                    <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
                  </svg>
                  <p class="ml-4">Code completion with instant preview</p>
                </li>
              </ul>
              <p>
                Perfect for learning how the framework works, prototyping a new idea, or creating a demo to share
                online.
              </p>
            </div>
            <div class="pt-8 text-base font-semibold leading-7">
              <p class="text-gray-900">Want to dig deeper into Tailwind?</p>
              <p>
                <a href="https://tailwindcss.com/docs" class="text-sky-500 hover:text-sky-600">Read the docs &rarr;</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
