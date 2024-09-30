<template>
  <Transition name="expand">
    <div v-if="show" class="lg:w-full lg:max-w-2xl">
      <div>
        <div class="flex flex-col gap-3 p-4 shadow-lg bg-cloud dark:bg-stone-800 lg:rounded-xl lg:shadow-xl">
          <div>
            <h2 class="text-lg font-semibold">How did you sleep?</h2>
            <div class="flex items-center gap-2 mt-2">
              <MoodPickerButton :grow="quality === 1 || quality == null"
                                :highlight="quality === 1"
                                class="bg-traffic-100"
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
            <h2 class="text-lg font-semibold">How long did you sleep?</h2>
            <div class="flex items-center justify-between">
              <HourSelect v-model="duration" :step="30"/>
            </div>
          </div>

          <PrimaryButton class="px-4 py-2 !bg-white mt-1 !text-stone-800 text-lg grow justify-center font-semibold"
                         @click="save">
            Save
          </PrimaryButton>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import type {TrackerData} from "types";
import {useTrackerStore} from "stores/tracker";
import {useCalenderStore} from "stores/calender";
import type {DateTime} from "luxon";

const {create, update, today} = useTrackerStore()
const calenderStore = useCalenderStore()

const props = defineProps<{
  tracker?: Partial<TrackerData> | null
  date?: Date | null
}>()

/* The tracker object */
const id = ref<string | null>(props.tracker?.id ?? null)
const duration = ref<number>(props.tracker?.duration ?? 8 * 60)
const quality = ref<number | null>(props.tracker?.quality ?? 3)

/* Show-n-hide */
const show = ref<boolean>(false)

const emit = defineEmits<{
  (e: 'save', updatedTracker: TrackerData | null): void
  (e: 'today-found'): void
  (e: 'today-not-found'): void
}>()

const save = async () => {
  let updatedTracker: TrackerData | null

  // hier kracht es mit dem datum beim updaten
  if (id.value !== null) {
    updatedTracker = (await update({
      id: id.value,
      quality: quality.value,
      duration: duration.value
    })).data.data ?? null

    calenderStore.updateDay(updatedTracker!)
  } else {
    if (props.date) {
      updatedTracker = (await create({
        date: props.date,
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


    calenderStore.updateDay(updatedTracker!)
  }

  show.value = false
  emit('save', updatedTracker)
}

const showTracker = () => show.value = true

const hideTracker = () => show.value = false

const toggle = () => show.value = !show.value

defineExpose({showTracker, hideTracker, toggle})
</script>
