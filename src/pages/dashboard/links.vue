<script lang="ts" setup>
import ShortenLink from 'components/molecules/shorten-link.vue'

definePageMeta({
  middleware: ['auth', 'verify-email'],
})
</script>

<template>
  <section class="my-6 md:my-8 gap-6 w-full">
    <ShortenLink />
    <div
      class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 my-8 bg-white divide-y dark:divide-gray-700 rounded border dark:border-gray-700"
    >
      <div v-for="i in [1, 2, 3, 4, 5, 6, 7]" :key="i" class="p-4 dark:bg-gray-900 bg-white">
        link 1
      </div>
    </div>
    <!-- <div class="flex justify-end">
      <nav class="inline-flex rounded-md shadow-sm border" aria-label="Pagination">
        <a
          href="#"
          class="relative inline-flex items-center rounded-l-md bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
        >
          <span class="sr-only">Previous</span>
          <Icon name="material-symbols:chevron-left-rounded" size="24" />
        </a>

        <a
          href="#"
          aria-current="page"
          class="relative z-10 inline-flex items-center bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 focus:z-20"
          >1</a
        >

        <span
          class="relative inline-flex items-center bg-white px-4 py-2 text-sm font-medium text-gray-700"
          >...</span
        >
        <a
          href="#"
          class="relative hidden items-center bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 md:inline-flex"
          >8</a
        >

        <a
          href="#"
          class="relative inline-flex items-center rounded-r-md bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
        >
          <span class="sr-only">Next</span>
          <Icon name="material-symbols:chevron-right-rounded" size="24" />
        </a>
      </nav>
    </div> -->
  </section>
</template>
