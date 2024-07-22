<template>
  <div class="flex flex-col h-full relative">
    <Fader class="text-stone-900" vertical>
      <Calendar ref="calendar"/>
    </Fader>

    <DailyTracker @save="handleTrackerSave"/>
  </div>
</template>

<script lang="ts" setup>
import type {TrackerData} from "types";
import type {Calendar} from "#components";

const calendar = ref<typeof Calendar | null>()

const handleTrackerSave = (tracker: TrackerData | null) => {
  if (tracker) {
    calendar.value?.updateDay(tracker)
  }
}

definePageMeta({
  middleware: 'auth',
  layout: 'default',
  pageTransition: {name: 'fade-page'},
  layoutTransition: {name: 'stay'}
})
</script>