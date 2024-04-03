<template>
  <div class="flex flex-col h-full gap-4 px-4 pt-4 text-cloud">
    <h1 class="text-2xl font-semibold">Search</h1>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
  layout: 'default',
  pageTransition: {name: 'fade-page'},
  layoutTransition: {name: 'stay'}
})
</script>