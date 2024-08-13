<template>
  <div class="flex flex-col h-full gap-3 pt-4 overflow-y-hidden">
    <div class="flex flex-col items-stretch rounded-3xl mx-4 px-4 lg:mx-0 py-2 bg-white dark:bg-stone-950">
      <div class="flex items-stretch">
        <MagnifyingGlassIcon class="w-6 h-6 shrink-0 my-auto"/>
        <input v-model="searchTerm" class="bg-transparent border-none focus:ring-0 text-xl grow py-0"
               placeholder="Search..."
               @input="search">
        <IconButton class="flex items-center justify-center aspect-square" @click="tagDropdown?.toggle">
          <FunnelIcon class="w-6 h-6 stroke-[1.5px] stroke-stone-950 dark:stroke-white"/>
        </IconButton>
      </div>
      <TagDropdown ref="tagDropdown" v-model="filteredTags" @update="search"/>
    </div>

    <Fader class="grow text-cloud dark:text-stone-900" vertical>
      <div class="h-full overflow-y-auto text-stone-950 dark:text-white">
        <Dream v-for="dream in results" :key="dream.id!" :dream="dream"
               class="last:border-none border-b-4 border-b-white dark:border-b-stone-950 lg:border-b-2"/>
      </div>
    </Fader>
  </div>
</template>

<script lang="ts" setup>
import {FunnelIcon, MagnifyingGlassIcon} from '@heroicons/vue/24/outline';
import type {DreamWithTags} from "~/prisma/types";
import type {TagDropdown} from "#components";

definePageMeta({
  middleware: 'auth',
  layout: 'default',
  pageTransition: {name: 'fade-page'},
  layoutTransition: {name: 'stay'}
})

const dreamsStore = useDreamsStore()

const results = ref<DreamWithTags[]>([])
const searchTerm = ref<string>('')
const filteredTags = ref<string[]>([])

const tagDropdown = ref<typeof TagDropdown>()


onMounted(async () => {
  await search()
})

const search = async () => {
  console.log(filteredTags.value)
  results.value = await dreamsStore.search(searchTerm.value, filteredTags.value.join(":"))
}

</script>