<template>
    <div>
        <div class="h-96"></div>
        <div class="h-96"></div>
        <div class="h-96"></div>
        <div class="h-96"></div>
        <NuxtLink to="/create" class="fixed right-6 bottom-[6.5rem] bg-primary p-3 rounded-full shadow-lg">
            <PlusIcon class="w-8 h-8 stroke-[1.5px] stroke-white" />
        </NuxtLink>
    </div>
</template>

<script setup lang="ts">
import { PlusIcon } from '@heroicons/vue/24/outline';

definePageMeta({
    middleware: 'auth',
    layoutTransition: { name: 'stay' }
})  
</script>


<style>
.stay-enter-active,
.stay-leave-active {
    transition: all 0.2s;
}

.stay-enter-from,
.stay-leave-to {
    filter: grayscale(0);
}
</style>