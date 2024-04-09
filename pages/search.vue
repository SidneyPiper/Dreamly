<template>
  <div class="flex flex-col h-full gap-4 px-4 pt-4 text-cloud">
    <div class="flex items-center gap-2 bg-stone-950 rounded-full px-5 py-1">
      <MagnifyingGlassIcon class="w-6 h-6"/>
      <input v-model="searchTerm" class="grow bg-transparent border-none focus:ring-0 text-xl" placeholder="Search..."
             @input="search">
    </div>
    <div class="flex flex-col items-stretch">
      <Dream v-for="dream in results" :key="dream.id!" :dream="dream"
             class="last:border-none border-b-4 border-b-white dark:border-b-stone-950"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {MagnifyingGlassIcon} from '@heroicons/vue/24/solid';
import type {DreamWithTags} from "~/prisma/types";

definePageMeta({
  middleware: 'auth',
  layout: 'default',
  pageTransition: {name: 'fade-page'},
  layoutTransition: {name: 'stay'}
})

const dreamsStore = useDreamsStore()

const results = ref<DreamWithTags[]>([])
const searchTerm = ref<string>('')

const search = async () => {
  if (searchTerm.value == '') {
    results.value = []
  } else {
    results.value = await dreamsStore.search(searchTerm.value)
  }
}

</script>