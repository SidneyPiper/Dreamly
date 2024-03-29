<template>
    <NuxtLink v-if="props.to" :to="props.to"
        class="flex items-center border-primary border-2 px-6 py-1 rounded-md">
        <slot />
    </NuxtLink>
    <button v-else class="flex items-center border-primary border-2 px-6 py-1 rounded-md">
        <slot />
    </button>
</template>

<script setup>
const props = defineProps(['to'])
</script>