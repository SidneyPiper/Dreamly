<template>
  <div class="flex flex-col h-full relative">
    <Fader class="text-cloud dark:text-stone-900" vertical>
      <Calendar ref="calendar"/>
    </Fader>

    <DailyTracker ref="dailyTracker" @save="handleTrackerSave"/>
  </div>
</template>

<script lang="ts" setup>
import type {TrackerData} from "types";
import {type Calendar, DailyTracker} from "#components";
import {useTrackerStore} from "stores/tracker";

const {today} = useTrackerStore()

const calendar = ref<typeof Calendar | null>()
const dailyTracker = ref<typeof DailyTracker>()

const handleTrackerSave = (tracker: TrackerData | null) => {
  if (tracker) {
    calendar.value?.updateDay(tracker)
  }
}

onMounted(async () => {
  if (await today()) {
    dailyTracker.value?.hideTracker()
  } else {
    dailyTracker.value?.showTracker()
  }
})

definePageMeta({
  middleware: 'auth',
  layout: 'default',
  pageTransition: {name: 'fade-page'},
  layoutTransition: {name: 'stay'}
})
</script>