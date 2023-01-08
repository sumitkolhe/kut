<script lang="ts" setup>
import { VFrappeChart } from 'vue-frappe-chart'
import { useLinkStore } from 'store/link.store'
import { storeToRefs } from 'pinia'

definePageMeta({
  middleware: ['auth'],
  layout: 'links',
})

const route = useRoute()

const { fetchLinkViewStats } = useLinkStore()
const { linkViews } = storeToRefs(useLinkStore())

onMounted(() => fetchLinkViewStats(route.params.alias as string))

const labels = computed(() =>
  Object.keys(linkViews.value).map((date) => useDateFormat(date, 'DD MMM HH a').value)
)
const data = computed(() => Object.values(linkViews.value))
</script>

<template>
  <section class="my-8">
    <client-only>
      <nuxt-link
        target="_blank"
        :to="`https://kut.sh/${route.params.alias}`"
        class="my-4 flex w-fit cursor-pointer items-center space-x-3 rounded border bg-gray-50 py-2 px-4"
      >
        <p>https://kut.sh/{{ route.params.alias }}</p>
        <Icon name="ph:arrow-right" size="20" />
      </nuxt-link>
      <div class="rounded border bg-gray-50 p-4">
        <v-frappe-chart
          type="line"
          :height="400"
          :labels="labels"
          :data="[{ values: data }]"
          :colors="['red']"
        />
      </div>
    </client-only>
  </section>
</template>
