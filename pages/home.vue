<template>
  <div class="flex flex-col h-full">
    <div class="flex flex-col items-stretch">
      <InfiniteScroller :bottom="0" @bottom="fetchNewPage">
        <Dream v-for="dream in dreamsStore.dreams" :key="dream.id!" :dream="dream"
               class="last-of-type:border-none border-b-4 border-white dark:border-stone-950 lg:border-b-2"
               @selected-tag="handleTagClick"/>
      </InfiniteScroller>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type {TagWithColor} from "~/prisma/types"

definePageMeta({
  middleware: 'auth',
  preserveScroll: true
})

const selectedTags = ref<TagWithColor[]>([])

const dreamsStore = useDreamsStore()
const route = useRoute()

onBeforeMount(async () => {
  await fetchNewPage()
})

const handleTagClick = (tag: TagWithColor) => {
  if (selectedTags.value.includes(tag)) {
    selectedTags.value = selectedTags.value.filter(x => x != tag)
  } else {
    selectedTags.value.push(tag)
  }
}

let page = 1
const fetchNewPage = async () => {
  if (await dreamsStore.fetch(page)) page++
}
</script>