<template>
    <div class="bg-red-500">
        <TagList class="overflow-x-scroll py-3 px-1" @click="unselect" :tags="selected" />
    </div>
    <slot />
    <div class="flex items-stretch bg-white dark:bg-stone-950">
        <TagCreate @created="fetchTags()" />
        <div
            class="relative h-14 w-full overflow-hidden before:absolute before:z-10 before:h-full before:w-1 before:bg-gradient-to-r before:from-white dark:before:from-stone-950 before:to-transparent after:absolute after:z-10 after:h-full after:w-1 after:right-0 after:top-0 after:bg-gradient-to-l dark:after:from-stone-950 after:from-white after:to-transparent">
            <TagList class="overflow-x-scroll py-3 px-1" @click="select" :tags="tags" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { type TagWithColor } from '../prisma/types'

const emit = defineEmits<{
    (e: 'update', selected: TagWithColor[]): void
}>()

const tags = ref<TagWithColor[]>([])
const selected = ref<TagWithColor[]>([])

const fetchTags = async () => {
    const response = await $fetch<TagWithColor[]>('/api/tags', {
        method: 'GET'
    })

    tags.value = response.filter(tag => !selected.value.some(sTag => tag.id === sTag.id))
}

const select = (tag: TagWithColor) => {
    selected.value.push(tag)
    tags.value = tags.value.filter(x => x != tag)
}

const unselect = (tag: TagWithColor) => {
    tags.value.push(tag)
    selected.value = selected.value.filter(x => x != tag)
}

onMounted(() => {
    fetchTags()
})
</script>