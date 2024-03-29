<template>
    <NuxtLink v-if="props.to" :to="props.to"
        class="flex items-center bg-primary px-6 py-1 rounded-md text-white shadow-md">
        <slot />
    </NuxtLink>
    <button v-else
        class="flex items-center bg-primary px-6 py-1 rounded-md text-white shadow-md transition-all disabled:saturate-[25%]">
        <slot />
    </button>
</template>

<script setup>
const props = defineProps(['to'])
</script>