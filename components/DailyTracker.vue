<template>
  <Transition name="expand">
    <div v-if="show">
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
            <HourSelect v-model:time="duration" :model-value="duration" :step="30"/>
          </div>
        </div>

        <PrimaryButton class="px-4 py-2 !bg-white mt-1 !text-stone-800 text-lg grow justify-center font-semibold"
                       @click="save">
          Save
        </PrimaryButton>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import type {TrackerData} from "types";
import {useTrackerStore} from "stores/tracker";

const {create, update, today} = useTrackerStore()

const props = withDefaults(defineProps<{
  tracker?: Partial<TrackerData>
  showAlways?: boolean
}>(), {
  showAlways: false
})

/* The tracker object */
const id = ref<string | null>(props.tracker?.id ?? null)
const duration = ref<number>(props.tracker?.duration ?? 8 * 60)
const quality = ref<number | null>(props.tracker?.quality ?? null)

/* Hide the dialog if already saved */
const show = ref(props.showAlways)

watch(duration, (newDuration) => {
  duration.value = newDuration
})

onMounted(async () => {
  if (!await today()) show.value = true
})

const save = async () => {
  if (id.value !== null) {
    update({
      id: id.value,
      quality: quality.value,
      duration: duration.value
    }).then(() => {
      show.value = props.showAlways
    })
  } else {
    create({
      date: new Date(),
      quality: quality.value,
      duration: duration.value
    }).then(() => {
      show.value = props.showAlways
    })
  }
}

</script>
