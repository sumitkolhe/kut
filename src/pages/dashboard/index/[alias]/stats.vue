<script lang="ts" setup>
import { VFrappeChart } from 'vue-frappe-chart'
import { useLinkStore } from 'store/link.store'
import { storeToRefs } from 'pinia'
import StatsMenu from 'components/molecules/menus/stats-menu.vue'

// global
const route = useRoute()

// store
const { fetchLinkViewStats } = useLinkStore()
const { linkViews } = storeToRefs(useLinkStore())

// refs
const period = ref('1h')

onMounted(() => fetchLinkViewStats(route.params.alias.toString(), '1h'))

// computed
const labels = computed(() => {
  if (linkViews.value) {
    return Object?.keys(linkViews.value).map((date) => useDateFormat(date, 'DD MMM HH a').value)
  } else {
    return []
  }
})

const values = computed(() => {
  if (linkViews.value) {
    return Object?.values(linkViews.value)
  } else {
    return []
  }
})

const totalVisits = computed(() => {
  let sum = 0
  if (linkViews.value) {
    const values = Object?.values(linkViews.value).map((view: number) => view)
    values.forEach((i) => (sum = sum + i))
    return sum
  } else {
    return sum
  }
})

// functions
const updatePeriod = (value: string) => {
  period.value = value
}

// watchers
watch(period, async (newPeriod) => {
  await fetchLinkViewStats(route.params.alias.toString(), newPeriod)
})
</script>

<template>
  <section class="my-6 md:my-8">
    <client-only>
      <div class="mb-4 flex items-center justify-between">
        <div class="flex space-x-4">
          <div
            class="flex items-center rounded border bg-gray-50 px-4 text-lg dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
          >
            <p>{{ totalVisits }} <span class="text-sm">clicks</span></p>
          </div>

          <nuxt-link
            class="rounded border bg-gray-50 px-4 py-2 hover:border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:hover:border-gray-400"
            target="_blank"
            :to="`https://kut.sh/${route.params.alias}`"
          >
            <p
              v-slice="20"
              :title="`https://kut.sh/${route.params.alias}`"
              class="text-sm dark:text-gray-200 md:text-base"
            >
              https://kut.sh/{{ route.params.alias }}
            </p>
          </nuxt-link>
        </div>
        <stats-menu @update:model-value="updatePeriod" />
      </div>

      <div
        v-if="values.length > 0"
        class="min-h-[300px] items-center justify-center rounded border bg-gray-50 p-2 dark:border-gray-700 dark:bg-gray-900"
      >
        <v-frappe-chart
          type="line"
          :height="400"
          :labels="labels"
          :data="[{ values }]"
          :colors="['red']"
        />
      </div>
      <div
        v-else
        class="flex min-h-[300px] items-center justify-center rounded border bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900"
      >
        <p class="text-xl text-gray-500">No data available for last {{ period }}</p>
      </div>
    </client-only>
  </section>
</template>
