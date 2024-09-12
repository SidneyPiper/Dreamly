<template>
  <div class="flex flex-col h-full relative">
    <div class="flex items-center justify-between p-4">
      <TextButton class="flex items-center gap-2 font-semibold text-xl" @click="$router.back">
        <ChevronLeftIcon class="w-6 h-6"/>
        Back
      </TextButton>
    </div>

    <Fader class="grow text-stone-900" vertical>
      <div
          class="h-full overflow-y-auto text-white px-4 pb-4 flex flex-col gap-6 space-y-1 items-center justify-center">
        <LabeledText label="Buy us a Coffee :)">
          <a href="https://www.paypal.me/sidneypiper">paypal.me/sidneypiper</a>
        </LabeledText>
      </div>
    </Fader>
  </div>
</template>

<script setup lang="ts">
import {ChevronLeftIcon} from "@heroicons/vue/24/solid";

definePageMeta({
  middleware: 'auth',
})
</script>