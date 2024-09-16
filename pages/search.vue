<template>
  <div class="flex flex-col h-full gap-3 pt-4 overflow-y-hidden">
    <div class="flex flex-col items-stretch rounded-3xl mx-4 px-4 lg:mx-0 bg-white dark:bg-stone-950">
      <div class="flex items-stretch w-full">
        <MagnifyingGlassIcon class="w-6 h-6 shrink-0 my-auto"/>
        <input v-model="searchStore.term"
               class="bg-transparent border-none focus:ring-0 text-xl grow shrink min-w-0"
               placeholder="Search..."
               @input="search"
               ref="searchInput"
               v-click-outside="() => $refs.searchInput.blur()">
        <IconButton class="flex items-center justify-center shrink-0 pl-3" @click="tagDropdown?.toggle">
          <FunnelIcon class="w-6 h-6 stroke-[1.5px] stroke-stone-950 dark:stroke-white"/>
        </IconButton>
      </div>
      <TagDropdown ref="tagDropdown" v-model="searchStore.tags" v-model:open="searchStore.filterOpen" @update="search"/>
    </div>

    <Fader class="grow text-cloud dark:text-stone-900" vertical>
      <div class="h-full overflow-y-auto text-stone-950 dark:text-white" data-scrollable="search">
        <Dream v-for="dream in searchStore.results" :key="dream.id!" :dream="dream"
               class="last:border-none border-b-4 border-b-white dark:border-b-stone-950 lg:border-b-2"/>
      </div>
    </Fader>
  </div>
</template>

<script lang="ts" setup>
import {FunnelIcon, MagnifyingGlassIcon} from '@heroicons/vue/24/outline';
import type {TagDropdown} from "#components";
import {useSearchStore} from "stores/search";
import {onBeforeUnmount} from "vue";
import {setPageScrollPositions} from "stores/scroll";

definePageMeta({
  middleware: 'auth',
  preserveScroll: true
})

onBeforeUnmount(() => {
  const windowScroll = window.scrollY
  const containerScroll: { [key: string]: number } = {}

  document.querySelectorAll('[data-scrollable]').forEach((c) => {
    if (c.hasAttribute('data-scrollable'))
      containerScroll[c.getAttribute('data-scrollable')!] = c.scrollTop;
  })

  setPageScrollPositions(from.fullPath, {
    window: windowScroll,
    containers: containerScroll,
  })
})

const searchStore = useSearchStore()

const tagDropdown = ref<typeof TagDropdown>()

onBeforeMount(async () => {
  await search()
})

const search = async () => {
  await searchStore.search()
}

</script>