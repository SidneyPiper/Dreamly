<template>
  <div class="flex flex-col h-full text-cloud">
    <div class="flex flex-col-reverse items-stretch">
      <Dream v-for="dream in filteredDreams" :key="dream.id" :dream="dream"
             class=" first:border-none border-b-4 border-b-stone-950" @selected-tag="handleTagClick"/>
    </div>
    <InfiniteLoading @infinite="console.log('test')"/>
  </div>
</template>

<script lang="ts" setup>
import type {TagWithColor} from "~/prisma/types"
import InfiniteLoading from "v3-infinite-loading"

definePageMeta({
  middleware: 'auth',
  layout: 'default',
  pageTransition: {name: 'fade-page'},
  layoutTransition: {name: 'stay'}
})

const selectedTags = ref<TagWithColor[]>([])

const dreamsStore = useDreamsStore()
await dreamsStore.fetch()

const filteredDreams = computed(() => {
  if (selectedTags.value.length == 0) return dreamsStore.dreams

  return dreamsStore.dreams.filter(dream => {
    return dream.tags.some(tag => {
      return selectedTags.value.some(other => tag.id == other.id)
    })
  })
})

const handleTagClick = (tag: TagWithColor) => {
  if (selectedTags.value.includes(tag)) {
    selectedTags.value = selectedTags.value.filter(x => x != tag)
  } else {
    selectedTags.value.push(tag)
  }
}
</script>