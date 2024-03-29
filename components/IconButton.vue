<template>
    <NuxtLink v-if="props.to" :to="props.to">
        <slot />
    </NuxtLink>
    <button v-else>
        <slot />
    </button>
</template>

<script setup>
const props = defineProps(['to'])
</script>