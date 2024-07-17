<template>
  <div class="flex flex-col h-full gap-4">
    <Calendar/>
    <DailyTracker/>
  </div>
</template>

<script lang="ts" setup>
import DailyTracker from "~/components/DailyTracker.vue";
import Calendar from "~/components/Calendar.vue";

definePageMeta({
  middleware: 'auth',
  layout: 'default',
  pageTransition: {name: 'fade-page'},
  layoutTransition: {name: 'stay'}
})
</script>