<template>
    <div class="flex flex-col gap-2 even:bg-stone-800 px-4 py-6">
        <h3 class="text-3xl font-semibold">{{ dream.title }}</h3>
        <TagList :tags="dream.tags" />
        <p>{{ dream.content }}</p>
    </div>
</template>

<script setup lang="ts">
import { type DreamWithTags } from "~/prisma/types";

const props = defineProps<{
    dream: DreamWithTags
}>()
</script>