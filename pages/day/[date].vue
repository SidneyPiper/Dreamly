<template>
  <div class="flex flex-col h-full relative">
    <!-- TODO: fix tracker position if to many dreams -->
    <div class="flex items-center justify-between p-4">
      <!-- Back button with date -->
      <TextButton class="flex items-center gap-2 font-semibold text-xl" @click="back">
        <ChevronLeftIcon class="w-6 h-6"/>
        <p class="-transform-y-[1px]">{{ date.day + getNumberSuffix(date.day) + date.toFormat(' LLLL yyyy') }}</p>
      </TextButton>

      <!-- Tracker button -->
      <PrimaryButton :class="'bg-traffic-' + (tracker?.quality ?? 0) * 100"
                     class="!text-stone-900 font-semibold"
                     @click="dailyTracker?.toggle()">
        {{ tracker?.duration ? `${Math.floor((tracker?.duration) / 60)}h ${tracker?.duration % 60}m` : 'Tracker' }}
      </PrimaryButton>
    </div>

    <!-- Dreams -->
    <Fader class="grow text-cloud dark:text-stone-900" vertical>
      <div class="h-full overflow-y-auto text-black dark:text-white">
        <Dream v-for="dream in dreams" :key="dream.id!" :dream="dream" :short-desc="true" :show-date="false"
               class="last:border-none border-b-4 border-b-white dark:border-b-stone-950"/>
      </div>
    </Fader>

    <!-- Tracker -->
    <DailyTracker ref="dailyTracker"
                  :tracker="tracker"
                  :date="('date' in $route.params && $route.params.date) ? DateTime.fromISO($route.params.date).toJSDate() : null"
                  class="grow lg:fixed lg:bottom-4"
                  @save="handleTrackerUpdate"/>
  </div>
</template>

<script lang="ts" setup>
import {DateTime} from "luxon";
import type {Day, DreamWithTags, TrackerData} from "types";
import {ChevronLeftIcon} from "@heroicons/vue/24/solid";
import type {DailyTracker} from "#components";
import {useCalenderStore} from "stores/calender";
import {useTrackerStore} from "#imports";

const {back} = useRouter()

definePageMeta({
  middleware: 'auth',
})

const route = useRoute()
const date = ref<DateTime>(DateTime.now())

const dreams = ref<DreamWithTags[]>([])
const tracker = ref<TrackerData | null>(null)
const dailyTracker = ref<typeof DailyTracker>()


if ('date' in route.params && route.params.date) {
  date.value = DateTime.fromISO(route.params.date)

  await $fetch<Day>('/api/day/' + date.value.toISODate(), {
    method: 'GET',
    headers: useRequestHeaders(['cookie']) as HeadersInit
  }).then((data) => {
    dreams.value = data.dreams
    tracker.value = data.tracker
  })
}


const handleTrackerUpdate = (updatedTracker: TrackerData | null) => {
  dailyTracker.value?.hideTracker()
  tracker.value = updatedTracker
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