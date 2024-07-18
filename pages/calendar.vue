<template>
  <div class="flex flex-col h-full relative">
    <Fader class="text-stone-900" vertical>
      <Calendar/>
    </Fader>
    <DailyTracker/>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: 'auth',
  layout: 'default',
  pageTransition: {name: 'fade-page'},
  layoutTransition: {name: 'stay'}
})
</script>