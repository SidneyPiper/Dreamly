<template>
  <div class="flex flex-col h-full relative">
    <div class="flex items-center justify-between p-4">
      <TextButton class="flex items-center gap-2 font-semibold text-xl" @click="$router.back">
        <ChevronLeftIcon class="w-6 h-6"/>
        Back
      </TextButton>
    </div>

    <Fader class="grow text-cloud dark:text-stone-900" vertical>
      <div class="h-full overflow-y-auto text-black dark:text-white px-4 pb-4 flex flex-col gap-6 space-y-1">
        <ImprintContent/>
      </div>
    </Fader>
  </div>
</template>

<script lang="ts" setup>
import {ChevronLeftIcon} from "@heroicons/vue/24/solid";
import ImprintContent from "~/components/static/ImprintContent.vue";

definePageMeta({
  middleware: 'auth',
})
</script>