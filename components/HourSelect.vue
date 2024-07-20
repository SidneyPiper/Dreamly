<template>
  <div class="flex items-stretch justify-between gap-2 mt-2 w-full">
    <IconButton class="p-2 bg-white dark:bg-stone-950 rounded-lg aspect-square shadow" @click="decrement">
      <MinusIcon class="w-7 h-7 stroke-2"/>
    </IconButton>
    <div class="text-2xl grow font-semibold py-2 px-6 bg-white dark:bg-stone-950 rounded-lg">
      <input v-model="input"
             v-maska="'#+:#+'"
             class="bg-transparent text-2xl m-0 border-none w-full text-center font-mono ring-0 p-0 focus:ring-0"
             data-maska-tokens="+:[0-9]:optional"
             type="text"
             @blur="fixTime"
             @maska="setValues">
    </div>
    <IconButton class="p-2 bg-white dark:bg-stone-950 rounded-lg aspect-square shadow" @click="increment">
      <PlusIcon class="w-7 h-7 stroke-2 "/>
    </IconButton>
  </div>
</template>

<script lang="ts" setup>
import {MinusIcon, PlusIcon} from '@heroicons/vue/24/outline'
import {vMaska} from "maska/vue"
import type {MaskaDetail} from "maska";

/* Whole component works on minutes */
const props = withDefaults(defineProps<{
  min?: number
  max?: number
  step?: number
}>(), {
  min: 0,
  max: 48 * 60,
  step: 30
})

/* Stores the time in minutes */
const time = defineModel<number>({default: 8 * 60})

/* Reference to input value */
const input = ref<string>('00:00')

const constrainTime = () => {
  time.value = Math.min(props.max, Math.max(props.min, time.value))
}

const updateDisplay = () => {
  const hours = Math.floor(time.value / 60)
  const minutes = time.value % 60
  input.value = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0')
}

watch(time, (newTime) => {
  console.log(newTime)
  constrainTime()
  updateDisplay()
}, {immediate: true})

const increment = () => {
  time.value += props.step
}

const decrement = () => {
  time.value -= props.step
}

const setValues = (e: CustomEvent<MaskaDetail>) => {
  if (!e.detail.completed) return

  const [newHours, newMinutes] = e.detail.masked.split(':').map(Number)
  time.value = newHours * 60 + newMinutes
}

const fixTime = () => {
  if (input.value === '') {
    updateDisplay()
    return
  }

  if (!input.value.includes(':')) {
    time.value = Math.min(props.max, Math.max(props.min, parseInt(input.value))) * 60
  } else {
    const [newHours, newMinutes] = input.value.split(':').map(Number)
    time.value = newHours * 60 + newMinutes
  }
}

defineExpose({
  increment,
  decrement,
})
</script>
