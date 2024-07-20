<template>
  <div
      class="h-full overflow-y-auto p-4 text-stone-950 bg-cloud dark:text-white dark:bg-stone-900">
    <InfiniteScroller :bottom="0" class="flex flex-col gap-4" @bottom="fetchOlder({month: 1})">
      <div v-for="(month, i) in months" :key="i" class="flex flex-col gap-1">
        <!-- Month name -->
        <p class="text-stone-400 font-semibold">{{ DateTime.now().minus({month: i}).toFormat("LLLL y") }}</p>

        <!-- Calendar month -->
        <div class="grid grid-cols-7 bg-stone-950 rounded-lg overflow-hidden p-1.5">
          <!-- Weekday names -->
          <div v-for="weekday in Info.weekdays('short')">
            <p class="text-stone-400 text-center text-sm font-semibold py-1">{{ weekday }}</p>
          </div>

          <!-- Skip empty days on start of month -->
          <div v-for="skip in DateTime.fromJSDate(month[0].date!).weekday - 1" :key="'empty_start_' + skip"
               class="bg-stone-950"></div>

          <!-- Actual days -->
          <NuxtLink v-for="data in month" :key="data.date!.toISOString()"
                    :to="'/day/' + DateTime.fromJSDate(data.date!).toISODate()"
                    class="flex flex-col grow justify-center items-center text-stone-950 p-1 relative ">
            <svg v-if="data.duration" :style="{width: width + 'px', height: width + 'px'}"
                 class="-rotate-90 flex items-center justify-center -translate-y-[1px] transition-all">
              <circle :cx="offset" :cy="offset" :r="radius" :stroke-width="strokeWeight" class="text-stone-700"
                      fill="transparent"
                      stroke="currentColor"/>

              <circle :class="data.quality ? 'text-traffic-' + data.quality * 100 : 'text-cloud'"
                      :cx="offset"
                      :cy="offset"
                      :r="radius"
                      :stroke-dasharray="circ"
                      :stroke-dashoffset="circ - (Math.min(data.duration, 12 * 60) / (12 * 60)) * circ"
                      :stroke-width="strokeWeight"
                      fill="transparent"
                      stroke="currentColor"/>
            </svg>
            <svg v-else :style="{width: width + 'px', height: width + 'px'}"
                 class="-rotate-90 w-10 h-10 flex items-center justify-center -translate-y-[1px]">
              <circle :cx="offset" :cy="offset" :r="radius" :stroke-width="strokeWeight" class="text-stone-700"
                      fill="transparent"
                      stroke="currentColor"/>
            </svg>
            <p class="font-mono text-cloud text-sm font-semibold absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
              {{ DateTime.fromJSDate(data.date!).toFormat('dd') }}
            </p>
          </NuxtLink>

          <!-- Skip empty days on end of month -->
          <div v-for="skip in 7 - DateTime.fromJSDate(month[month.length - 1].date!).weekday" :key="'empty_end_' + skip"
               class="bg-stone-950"></div>
        </div>
      </div>
    </InfiniteScroller>
  </div>
</template>

<script lang="ts" setup>
import {DateTime, type DurationLike, Info} from 'luxon'
import {onMounted} from "vue";
import type {TrackerData} from "~/prisma/types";

/* Circle math */
const radius = 15
const strokeWeight = 4
const circ = 2 * Math.PI * radius
const offset = radius + strokeWeight
const width = 2 * offset

/* All the data */
const months = ref<(Partial<TrackerData>[])[]>([])

const {empty, between} = useTrackerStore()

const fetchOlder = async (duration: DurationLike) => {
  let end = DateTime.now().minus({month: months.value.length}).endOf('month')
  let start = end.minus(duration).startOf('month')

  let month_rel = months.value.length;
  for (let d = end.startOf('month'); d >= start; d = d.minus({month: 1}).startOf('month')) {
    months.value[month_rel] = []

    for (let i = 0; i < d.daysInMonth; i++) {
      months.value[month_rel][i] = empty({
        date: d.plus({days: i}).toJSDate()
      })
    }

    month_rel++
  }

  await between(start, end).then(results => {
    results.forEach(day => {
      const month = Math.floor(Math.abs(DateTime.fromJSDate(day.date).startOf('month').diffNow().as('months')))
      const dayOfMonth = DateTime.fromJSDate(day.date).day - 1

      months.value[month][dayOfMonth] = day
    })
  })
}

onMounted(async () => {
  await fetchOlder({months: 2})
})
</script>