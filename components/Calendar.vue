<template>
  <div
      class="h-full overflow-y-auto p-4 text-stone-950 bg-cloud dark:text-white dark:bg-stone-900 @container">
    <InfiniteScroller ref="scroller"
                      :bottom="200"
                      class="grid grid-cols-1 @sm:grid-cols-2 @lg:grid-cols-3 @xl:grid-cols-4 gap-4 items-stretch"
                      @bottom="hitBottom">
      <div v-for="(month, i) in calenderStore.months" :key="i" class="flex flex-col gap-1 h-full">
        <!-- Month name -->
        <p class="text-stone-600 dark:text-stone-400 font-semibold">
          {{ DateTime.now().minus({month: i}).toFormat("LLLL y") }}</p>

        <!-- Calendar month -->
        <div class="bg-white dark:bg-stone-950 rounded-lg overflow-hidden p-1.5 grow">
          <div class="grid grid-cols-7">
            <!-- Weekday names -->
            <div v-for="weekday in Info.weekdays('short')">
              <p class="text-stone-600 dark:text-stone-400 text-center text-sm font-semibold py-1">{{ weekday }}</p>
            </div>

            <!-- Skip empty days on start of month -->
            <div v-for="skip in DateTime.fromJSDate(month[0].date!).weekday - 1" :key="'empty_start_' + skip"
                 class="bg-white dark:bg-stone-950"></div>

            <!-- Actual days -->
            <NuxtLink v-for="data in month" :key="data.date!.toISOString()"
                      :to="DateTime.fromJSDate(data.date!) <= DateTime.now().endOf('day') && '/day/' + DateTime.fromJSDate(data.date!).toISODate()"
                      class="flex flex-col grow justify-center items-center text-cloud dark:text-stone-950 p-1 relative">
              <svg :style="{width: width + 'px', height: width + 'px'}"
                   class="-rotate-90 flex items-center justify-center transition-all">
                <circle
                    :class="DateTime.fromJSDate(data.date!).hasSame(DateTime.now(), 'day') ? 'fill-stone-800 dark:fill-white' : 'fill-transparent'"
                    :cx="offset" :cy="offset" :r="radius"
                    :stroke-width="strokeWeight"
                    class="text-cloud dark:text-stone-700"
                    stroke="currentColor"/>

                <circle :class="data.quality ? 'text-traffic-' + data.quality * 100 : 'text-cloud'"
                        :cx="offset"
                        :cy="offset"
                        :r="radius"
                        :stroke-dasharray="circ"
                        :stroke-dashoffset="data.duration ? circ - (Math.min(data.duration, 12 * 60) / (12 * 60)) * circ : circ"
                        :stroke-width="strokeWeight + 0.7"
                        class="transition-all duration-1000 ease-in-out"
                        fill="transparent"
                        stroke="currentColor">
                </circle>
              </svg>
              <p :class="DateTime.fromJSDate(data.date!).hasSame(DateTime.now(), 'day') ? 'text-white dark:text-stone-950' : 'text-stone-800 dark:text-cloud'"
                 class="font-mono text-sm font-semibold absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                {{ DateTime.fromJSDate(data.date!).toFormat('dd') }}
              </p>
            </NuxtLink>

            <!-- Skip empty days on end of month -->
            <div v-for="skip in 7 - DateTime.fromJSDate(month[month.length - 1].date!).weekday"
                 :key="'empty_end_' + skip"
                 class="bg-white dark:bg-stone-950"></div>
          </div>
        </div>
      </div>
    </InfiniteScroller>
  </div>
</template>

<script lang="ts" setup>
import {DateTime, type DurationLike, Info} from 'luxon'
import {onMounted} from "vue";
import type {TrackerData} from "~/prisma/types";
import {useCalenderStore} from "stores/calender";

/* Circle math */
const radius = 15
const strokeWeight = 4
const circ = 2 * Math.PI * radius
const offset = radius + strokeWeight
const width = 2 * offset

/* All the data */
const calenderStore = useCalenderStore()

const scroller = ref()


const hitBottom = async () => {
  while (!scroller.value?.isScrollable) await calenderStore.fetchOlder({month: 0})
}


onMounted(async () => {
  while (!scroller.value?.isScrollable) {
    await calenderStore.fetchOlder({month: 0})
  }
})
</script>