<template>
  <div class="flex flex-col h-full overflow-y-auto gap-4 p-4 text-stone-950 bg-cloud dark:text-white dark:bg-stone-900">
    <div v-for="d in window" :key="d.toMillis()" class="flex flex-col gap-1">
      <div class="font-semibold flex items-center justify-between gap-1">
        <p class="text-stone-400">{{ d.toFormat("ccc, dd. LLL") }}</p>
        <p class="text-stone-400">{{ d.endOf('week').toFormat("ccc, dd. LLL") }}</p>
      </div>
      <div class="grid grid-cols-7 gap-0.5">
        <div v-for="day in Array.from({ length: 7 }, (_, i) => d.plus({ days: i - 1 }).startOf('day'))"
             :key="day.toMillis()"
             :class="day < today ? 'border-traffic-' + dayToColor(day.ordinal) : 'border-stone-800'"
             class="border-b-4 flex flex-col grow gap-0.5 justify-center py-2 items-center rounded-sm first:rounded-l-md last:rounded-r-md bg-stone-950">
          <div class="flex justify-center items-center">
            <!--            <ClockIcon class="w-4 h-4"/>-->
            <p v-if="day < today"
               class="text-sm font-semibold font-mono">{{
                Math.floor(Math.random() * 5 + 7).toString().padStart(2, '0')
              }}h<br>{{
                Math.random() > 0.5 ? '30' : '00'
              }}m</p>
          </div>

          <!--          <p class="font-semibold text-stone-500 text-sm leading-[1] font-mono">-->
          <!--            {{ d.plus({day: day - 1}).toFormat('dd. LLL') }}-->
          <!--          </p>-->
        </div>
      </div>
    </div>
  </div>

</template>

<script lang="ts" setup>
import {DateTime} from 'luxon'
import {onMounted} from "vue";
import {createNoise2D, type NoiseFunction2D} from "simplex-noise";

const today = DateTime.now().startOf('day')
const window = ref<DateTime[]>([])
const noise = ref<NoiseFunction2D>(createNoise2D())

const dayToColor = (day: number) => {
  const noiseValue = noise.value(day / 5.0, 0)

  // Normalize the noise value to range [0, 1]
  const normalizedValue = (noiseValue + 1) / 2

  // Map the normalized value to range [1, 5]
  const mappedValue = Math.floor(normalizedValue * 4.9999) + 1

  return mappedValue * 100
}

onMounted(() => {
  for (let d = DateTime.now().startOf('week');
       d >= DateTime.now().minus({week: 25}).startOf('week');
       d = d.minus({week: 1}).startOf('week')) {
    window.value.push(d)
  }
})
</script>