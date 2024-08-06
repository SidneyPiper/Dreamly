<template>
  <div v-if="status !== 'pending'" class="flex flex-wrap justify-center gap-x-6 gap-y-3 max-w-80">
    <button v-for="color in colors" :key="color.id"
            :style="{ 'background-color': color.hex, 'boxShadow': color.id === selectedColor?.id ? ('0px 0px 8px 1px ' + color.hex) : 'none' }"
            class="w-10 h-10 rounded-full shadow-inner transition-shadow"
            @click="selectedColor = color"></button>
  </div>
  <div v-else class="flex flex-wrap justify-center gap-x-6 gap-y-3 max-w-80">
    <span v-for="index in 9" :key="index" class="w-10 h-10 bg-stone-800 rounded-full shadow-md"></span>
  </div>
</template>

<script lang="ts" setup>
import {type Color} from '~/prisma/types'

const emit = defineEmits<{
  (e: 'select'): void
}>()

const selectedColor = defineModel<Color | null>()
const {status, data: colors} = await useLazyFetch<Color[]>('/api/colors')

watch(colors, () => {
  if (selectedColor.value === null)
    selectedColor.value = colors.value![0]
})

watch(selectedColor, () => {
  if (selectedColor.value !== null)
    emit('select')
  else
    selectedColor.value = colors.value![0]
})
</script>