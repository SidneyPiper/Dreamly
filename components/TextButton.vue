<template>
    <NuxtLink v-if="props.to" :to="props.to" class="flex items-center py-1">
        <slot />
    </NuxtLink>
    <button v-else class="flex items-center py-1">
        <slot />
    </button>
</template>

<script setup>
const props = defineProps(['to'])
</script>