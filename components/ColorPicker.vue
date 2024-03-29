<template>
    <div class="flex flex-wrap justify-center gap-x-6 gap-y-3 max-w-80">
        <button v-for="hex in props.colors" :key="hex" @click="handleClick(hex)" class="w-10 h-10 rounded-full shadow-md"
            :style="{ 'background-color': hex, 'boxShadow': hex == selected ? ('0px 0px 8px 1px ' + hex) : 'none' }"></button>
    </div>
</template>

<script setup>
const props = defineProps(['colors'])
const emit = defineEmits(['changeSelectedColor'])
const selected = ref('')

const handleClick = (hex) => {
    selected.value = hex
    emit('changeSelectedColor', selected.value)
}

onMounted(() => {
    selected.value = props.colors[0]
    emit('changeSelectedColor', selected.value)
})
</script>