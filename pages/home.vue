<template>
  <div class="flex flex-col h-full text-cloud">
    <div class="p-4">
      <IconButton
          class="border-dashed flex-wrap border-2 border-cloud text-cloud gap-2 flex w-full rounded-xl px-4 py-12 justify-center items-center"
          to="/dream">
        <CloudIcon class="w-12 h-12 shrink-0"/>
        <p class="font-semibold text-lg text-center">What did you dream today?</p>
      </IconButton>
    </div>

    <div class="flex flex-col-reverse items-stretch">
      <Dream v-for="dream in dreamsStore.dreams" :key="dream.id" :dream="dream"/>
    </div>

    <IconButton class="fixed right-6 bottom-[6.5rem] bg-primary p-3 rounded-full shadow-lg"
                to="/dream">
      <PlusIcon class="w-8 h-8 stroke-[1.5px] stroke-white"/>
    </IconButton>
  </div>
</template>

<script lang="ts" setup>
import {CloudIcon, PlusIcon} from '@heroicons/vue/24/outline';

definePageMeta({
  middleware: 'auth',
  layout: 'default',
  pageTransition: {name: 'fade-page'},
  layoutTransition: {name: 'stay'}
})

const dreamsStore = useDreamsStore()

onMounted(async () => {
  await dreamsStore.fetch()
})

</script>