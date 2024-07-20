<template>
  <div class="flex flex-col h-full relative">
    <h1 class="text-2xl font-semibold shrink-0 px-4 pt-4 pb-2">
      {{ date.day + getNumberSuffix(date.day) + date.toFormat(' LLLL yyyy') }}</h1>

    <Fader class="grow text-stone-900" vertical>
      <div class="h-full overflow-y-auto text-white">
        <Dream v-for="dream in dreams" :key="dream.id!" :dream="dream" :short-desc="true" :show-date="false"
               class="last:border-none border-b-4 border-b-white dark:border-b-stone-950"/>
      </div>
    </Fader>

    <!-- TODO - prop tracker not working ? idk, idc. -->
    <DailyTracker :tracker="tracker" class="grow" show-always/>
  </div>
</template>

<script lang="ts" setup>
import {DateTime} from "luxon";
import type {Day, DreamWithTags, TrackerData} from "types";

definePageMeta({
  middleware: 'auth',
  layout: 'default',
  pageTransition: {name: 'fade-page'},
  layoutTransition: {name: 'stay'}
})

const route = useRoute()
const date = ref<DateTime>(DateTime.now())

const dreams = ref<DreamWithTags[]>([])
const tracker = ref<TrackerData | null>(null)

if ('date' in route.params && route.params.date) {
  date.value = DateTime.fromISO(route.params.date)

  await $fetch<Day>('/api/day/' + date.value.toISODate(), {
    method: 'GET',
    headers: useRequestHeaders(['cookie']) as HeadersInit
  }).then((data) => {
    dreams.value = data.dreams
    tracker.value = data.tracker
    console.log(tracker.value)
  })
}

const getNumberSuffix = (num: number): ('st' | 'nd' | 'rd' | 'th') => {
  const th = 'th'
  const rd = 'rd'
  const nd = 'nd'
  const st = 'st'

  if (num === 11 || num === 12 || num === 13) return th

  let lastDigit = num.toString().slice(-1)

  switch (lastDigit) {
    case '1':
      return st
    case '2':
      return nd
    case '3':
      return rd
    default:
      return th
  }
}
</script>