<template>
    <div>
        test
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    middleware: 'auth',
    layout: 'default',
    pageTransition: { name: 'fade-page' },
    layoutTransition: { name: 'stay' }
})
</script>