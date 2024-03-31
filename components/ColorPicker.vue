<template>
    <div class="flex flex-wrap justify-center gap-x-6 gap-y-3 max-w-80">
        <button v-for="color in colors" :key="color.id" @click="click(color)" class="w-10 h-10 rounded-full shadow-md"
            :style="{ 'background-color': color.hex, 'boxShadow': color == selected ? ('0px 0px 8px 1px ' + color.hex) : 'none' }"></button>
    </div>
</template>

<script setup lang="ts">
import { type Color } from '../prisma/types'

const emit = defineEmits<{
    (e: 'select', color: Color): void
}>()

const selected = ref<Color>('')

const { data: colors } = await useFetch<Color[]>('/api/colors', {
    onResponse({ response }) {
        selected.value = response._data[0]
        console.log(response._data[0]);
        emit('select', selected.value)
    }
})

const click = (color) => {
    selected.value = color
    emit('select', selected.value)
}
</script>