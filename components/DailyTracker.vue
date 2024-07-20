<template>

  <div class="flex flex-col gap-3 shrink-0 px-4 py-4 shadow-lg bg-stone-800">
    <div>
      <h2 class="text-lg font-semibold">How did you sleep today?</h2>
      <div class="flex items-center gap-2 mt-2">
        <MoodPickerButton :grow="quality === 1 || quality == null"
                          :highlight="quality === 1" class="bg-traffic-100"
                          @click="quality = 1"/>
        <MoodPickerButton :grow="quality === 2 || quality == null"
                          :highlight="quality === 2"
                          class="bg-traffic-200"
                          @click="quality = 2"/>
        <MoodPickerButton :grow="quality === 3 || quality == null"
                          :highlight="quality === 3"
                          class="bg-traffic-300"
                          @click="quality = 3"/>
        <MoodPickerButton :grow="quality === 4 || quality == null"
                          :highlight="quality === 4"
                          class="bg-traffic-400"
                          @click="quality = 4"/>
        <MoodPickerButton :grow="quality === 5 || quality == null"
                          :highlight="quality === 5"
                          class="bg-traffic-500"
                          @click="quality = 5"/>
      </div>
    </div>
    <div>
      <h2 class="text-lg font-semibold">How long did you sleep today?</h2>
      <div class="flex items-center justify-between">
        <HourSelect v-model="duration" :step="30"/>
      </div>
    </div>

    <PrimaryButton class="px-4 py-2 !bg-white mt-1 !text-stone-800 text-lg grow justify-center font-semibold"
                   @click="save">
      Save
    </PrimaryButton>
  </div>
</template>

<script lang="ts" setup>
import type {TrackerData} from "types";
import {useTrackerStore} from "stores/tracker";

const {create, update, today} = useTrackerStore()

const props = defineProps<{
  tracker?: Partial<TrackerData>
  showAlways?: boolean
}>()

/* The tracker object */
const id = ref<string | null>(props.tracker?.id ?? null)
const duration = ref<number>(props.tracker?.duration ?? 8 * 60)
const quality = ref<number | null>(props.tracker?.quality ?? null)

/* I don't know what this does */
watch(duration, (newDuration) => {
  duration.value = newDuration
})

const emit = defineEmits<{
  (e: 'save', updatedTracker: TrackerData | null): void
  (e: 'today-found'): void
}>()

onMounted(async () => {
  if (await today()) emit('today-found')
})

const save = async () => {
  console.log("Saving: " + duration.value)

  let updatedTracker: TrackerData | null
  if (id.value !== null) {
    updatedTracker = (await update({
      id: id.value,
      quality: quality.value,
      duration: duration.value
    })).data.data ?? null
  } else {
    updatedTracker = (await create({
      date: new Date(),
      quality: quality.value,
      duration: duration.value
    })).data.data ?? null
  }

  emit('save', updatedTracker)
}

</script>
