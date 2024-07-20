<template>
  <div class="flex flex-col h-full gap-3 pt-4 text-cloud overflow-y-hidden">

    <div class="flex items-center gap-2 bg-stone-950 rounded-full mx-4 px-4 py-1">
      <MagnifyingGlassIcon class="w-6 h-6 shrink-0"/>
      <input v-model="searchTerm" class="bg-transparent border-none focus:ring-0 text-xl" placeholder="Search..."
             @input="search">
    </div>

    <Fader class="grow text-stone-900" vertical>
      <div class="h-full overflow-y-auto text-white">
        <Dream v-for="dream in results" :key="dream.id!" :dream="dream"
               class="last:border-none border-b-4 border-b-white dark:border-b-stone-950"/>
      </div>
    </Fader>
  </div>
</template>

<script lang="ts" setup>
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