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

const props = withDefaults(defineProps<{
  hours?: number
  minutes?: number
  min?: number
  max?: number
  step?: number
}>(), {
  hours: 0,
  minutes: 0,
  min: 0,
  max: 48,
  step: 30
})

const hours = ref(props.hours)
const minutes = ref(props.minutes)
const input = ref(hours.value.toString().padStart(2, '0') + ':' + minutes.value.toString().padStart(2, '0'))

const increment = () => {
  minutes.value += props.step
  hours.value += Math.floor(minutes.value / 60)
  minutes.value %= 60

  if (hours.value === props.max && minutes.value > 0) {
    hours.value = props.max
    minutes.value = 0
  }

  if (hours.value > props.max) {
    hours.value = props.max
    minutes.value = 0
  }

  input.value = hours.value.toString().padStart(2, '0') + ':' + minutes.value.toString().padStart(2, '0')
}

const decrement = () => {
  if (hours.value === props.min && minutes.value - props.step < 0) {
    hours.value = props.min
    minutes.value = 0
    return
  }
  minutes.value -= props.step // 8 : -42
  hours.value += Math.floor(minutes.value / 60) // 7 : -42
  minutes.value = ((minutes.value % 60) + 60) % 60
  hours.value = Math.max(props.min, hours.value)

  input.value = hours.value.toString().padStart(2, '0') + ':' + minutes.value.toString().padStart(2, '0')
}

const reset = () => {
  hours.value = props.hours
  minutes.value = props.minutes
}

const setValues = (e: CustomEvent<MaskaDetail>) => {
  if (!e.detail.completed) return

  const [newHours, newMinutes] = e.detail.masked.split(':').map(Number)

  hours.value = Math.min(props.max, Math.max(props.min, newHours))
  minutes.value = Math.min(59, Math.max(0, newMinutes))

  if (hours.value === props.max && minutes.value > 0) {
    hours.value = props.max
    minutes.value = 0
  }

  input.value = hours.value.toString().padStart(2, '0') + ':' + minutes.value.toString().padStart(2, '0')
}

const fixTime = () => {
  if (input.value === '') {
    input.value = hours.value.toString().padStart(2, '0') + ':' + minutes.value.toString().padStart(2, '0')
    return
  }

  if (!input.value.includes(':')) {
    hours.value = Math.min(props.max, Math.max(props.min, parseInt(input.value)))
    minutes.value = 0
    input.value = Math.min(props.max, Math.max(props.min, hours.value)).toString().padStart(2, '0') + ':00'
  } else {
    const [newHours, newMinutes] = input.value.split(':').map(Number)
    console.log(newHours, newMinutes)
    hours.value = Math.min(props.max, Math.max(props.min, newHours))
    minutes.value = Math.min(59, Math.max(0, newMinutes))

    if (hours.value === props.max && minutes.value > 0) {
      hours.value = props.max
      minutes.value = 0
    }

    input.value = hours.value.toString().padStart(2, '0') + ':' + minutes.value.toString().padStart(2, '0')
  }
}

defineExpose({
  hours,
  minutes,
  increment,
  decrement,
  reset
})
</script>
