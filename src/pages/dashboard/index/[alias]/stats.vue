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
            class="bg-primary-50 dark:border-primary-700 dark:bg-primary-900 dark:text-primary-200 flex items-center rounded border px-4 text-lg"
          >
            <p>{{ totalVisits }} <span class="text-sm">clicks</span></p>
          </div>

          <nuxt-link
            class="bg-primary-50 hover:border-primary-300 dark:border-primary-700 dark:bg-primary-900 dark:hover:border-primary-400 rounded border px-4 py-2"
            target="_blank"
            :to="`https://kut.sh/${route.params.alias}`"
          >
            <p
              v-slice="20"
              :title="`https://kut.sh/${route.params.alias}`"
              class="dark:text-primary-200 text-sm md:text-base"
            >
              https://kut.sh/{{ route.params.alias }}
            </p>
          </nuxt-link>
        </div>
        <stats-menu @update:model-value="updatePeriod" />
      </div>

      <div
        v-if="values.length > 0"
        class="bg-primary-50 dark:border-primary-700 dark:bg-primary-900 min-h-[300px] items-center justify-center rounded border p-2"
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
        class="bg-primary-50 dark:border-primary-700 dark:bg-primary-900 flex min-h-[300px] items-center justify-center rounded border p-4"
      >
        <p class="text-primary-500 text-xl">No data available for last {{ period }}</p>
      </div>
    </client-only>
  </section>
</template>
