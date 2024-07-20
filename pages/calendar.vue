<template>
  <div class="flex flex-col h-full relative">
    <Fader class="text-stone-900" vertical>
      <Calendar/>
    </Fader>
    <Transition name="expand">
      <div v-if="showTracker">
        <DailyTracker @save="showTracker = false" @today-found="showTracker = false"/>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
const showTracker = ref(false)

definePageMeta({
  middleware: 'auth',
  layout: 'default',
  pageTransition: {name: 'fade-page'},
  layoutTransition: {name: 'stay'}
})
</script>