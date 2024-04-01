<template>
    <div class="flex flex-col h-full gap-4 text-cloud">
        <div v-if="!pending" class="flex flex-col-reverse items-stretch">
            <Dream v-for="dream in dreams" :key="dream.id" :dream="dream" />
        </div>
        <div v-else>
            <p>Lädt</p>
        </div>

        <IconButton to="/create" class="fixed right-6 bottom-[6.5rem] bg-primary p-3 rounded-full shadow-lg">
            <PlusIcon class="w-8 h-8 stroke-[1.5px] stroke-white" />
        </IconButton>
    </div>
</template>

<script setup lang="ts">
import { PlusIcon } from '@heroicons/vue/24/outline';
import { type DreamWithTags } from "~/prisma/types";

definePageMeta({
    middleware: 'auth',
    layout: 'default',
    pageTransition: { name: 'fade-page' },
    layoutTransition: { name: 'stay' }
})

const { pending, data: dreams } = await useLazyFetch<DreamWithTags[]>('/api/dreams')
</script>