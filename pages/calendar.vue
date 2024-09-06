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
</script>