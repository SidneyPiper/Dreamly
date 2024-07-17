<template>
  <div class="flex flex-col grow overflow-y-auto gap-2 p-4">
    <div v-for="d in window" :key="d.toMillis()" class="flex flex-col gap-2 bg-stone-800 py-2 px-4 rounded-md">
      <p class="font-semibold">Week {{ d.weekNumber }}/{{ d.year }}</p>
      <div class="flex items-center gap-2 justify-between">
        <div v-for="day in 7" :key="d.plus({ day: day - 1}).startOf('day').toMillis()"
             class="flex flex-col grow justify-center py-2 items-center rounded-md bg-stone-950">
          <p class="font-bold leading-[1] font-mono">{{ d.plus({day: day - 1}).toFormat('dd') }}<br>{{
              d.plus({day: day - 1}).toFormat('LL')
            }}</p>
        </div>
      </div>
    </div>
  </div>

</template>

<script lang="ts" setup>
import {DateTime} from 'luxon'
import {onMounted} from "vue";

const window = ref<DateTime[]>([])

onMounted(() => {
  for (let d = DateTime.now().startOf('week');
       d >= DateTime.now().minus({week: 25}).startOf('week');
       d = d.minus({week: 1}).startOf('week')) {
    window.value.push(d)
  }
})
</script>