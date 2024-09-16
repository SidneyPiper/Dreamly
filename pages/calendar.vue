<template>
  <div class="flex flex-col h-full relative">
    <Fader class="text-cloud dark:text-stone-900" vertical>
      <Calendar ref="calendar" data-scrollable="calender"/>
    </Fader>

    <DailyTracker ref="dailyTracker" @save="handleTrackerSave" class="lg:fixed lg:bottom-4"/>
  </div>
</template>

<script lang="ts" setup>
import type {TrackerData} from "types";
import {type Calendar, DailyTracker} from "#components";
import {useTrackerStore} from "stores/tracker";
import {onBeforeUnmount} from "vue";
import {setPageScrollPositions} from "stores/scroll";

const {today} = useTrackerStore()

const calendar = ref<typeof Calendar | null>()
const dailyTracker = ref<typeof DailyTracker>()

const handleTrackerSave = (tracker: TrackerData | null) => {
  if (tracker) {
    calendar.value?.updateDay(tracker)
  }
}

onBeforeMount(async () => {
  if (await today()) {
    dailyTracker.value?.hideTracker()
  } else {
    dailyTracker.value?.showTracker()
  }
})

definePageMeta({
  middleware: 'auth',
  preserveScroll: true
})

onBeforeUnmount(() => {
  const windowScroll = window.scrollY
  const containerScroll: { [key: string]: number } = {}

  document.querySelectorAll('[data-scrollable]').forEach((c) => {
    if (c.hasAttribute('data-scrollable'))
      containerScroll[c.getAttribute('data-scrollable')!] = c.scrollTop;
  })

  setPageScrollPositions(from.fullPath, {
    window: windowScroll,
    containers: containerScroll,
  })
})
</script>