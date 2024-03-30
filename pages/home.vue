<template>
    <div class="flex flex-col">
        <div class="h-96">testestst</div>
        <div class="h-96"></div>
        <div class="h-96"></div>
        <div class="h-96"></div>
        <IconButton to="/create" class="fixed right-6 bottom-[6.5rem] bg-primary p-3 rounded-full shadow-lg">
            <PlusIcon class="w-8 h-8 stroke-[1.5px] stroke-white" />
        </IconButton>
    </div>
</template>

<script setup lang="ts">
import { PlusIcon } from '@heroicons/vue/24/outline';

definePageMeta({
    middleware: 'auth',
    layout: 'default',
    pageTransition: { name: 'fade-page' },
    layoutTransition: { name: 'stay' }
})
</script>