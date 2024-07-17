<template>
  <div class="shrink-0 px-4 pb-4 shadow-lg">
    <h2 class="text-lg font-semibold">How did you sleep today?</h2>
    <div class="flex items-center mt-2 gap-2">
      <MoodPickerButton :grow="mood === 1 || mood === null"
                        :highlight="mood === 1" class="bg-traffic-500"
                        @click="setMood(1)"/>
      <MoodPickerButton :grow="mood === 2 || mood === null" :highlight="mood === 2" class="bg-traffic-400"
                        @click="setMood(2)"/>
      <MoodPickerButton :grow="mood === 3 || mood === null" :highlight="mood === 3" class="bg-traffic-300"
                        @click="setMood(3)"/>
      <MoodPickerButton :grow="mood === 4 || mood === null" :highlight="mood === 4" class="bg-traffic-200"
                        @click="setMood(4)"/>
      <MoodPickerButton :grow="mood === 5 || mood === null" :highlight="mood === 5" class="bg-traffic-100"
                        @click="setMood(5)"/>
    </div>

    <h2 class="mt-3 text-lg font-semibold">How long did you sleep today?</h2>
    <div class="flex items-center justify-between">
      <HourSelect :hours="8" :minutes="0" :step="30"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
const mood = ref<null | 1 | 2 | 3 | 4 | 5>(null)

const setMood = (value: 1 | 2 | 3 | 4 | 5) => {
  mood.value = value
}
</script>
