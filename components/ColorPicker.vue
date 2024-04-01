<template>
  <div v-if="!pending" class="flex flex-wrap justify-center gap-x-6 gap-y-3 max-w-80">
    <button v-for="color in colors" :key="color.id"
      :style="{ 'background-color': color.hex, 'boxShadow': color == selected ? ('0px 0px 8px 1px ' + color.hex) : 'none' }"
      class="w-10 h-10 rounded-full shadow-md" @click="selected = color"></button>
  </div>
  <div v-else class="flex flex-wrap justify-center gap-x-6 gap-y-3 max-w-80">
    <span v-for="index in 11" :key="index" class="w-10 h-10 bg-stone-800 rounded-full shadow-md"></span>
  </div>
</template>

<script lang="ts" setup>
import { type Color } from '~/prisma/types'

const emit = defineEmits<{
  (e: 'select', color: Color): void
}>()

const selected = ref<Color | null>()
const { pending, data: colors } = await useLazyFetch<Color[]>('/api/colors')

watch(colors, () => {
  if (selected.value == null)
    selected.value = colors.value![0]
})

watch(selected, () => {
  if (selected.value != null)
    emit('select', selected.value)
})
</script>