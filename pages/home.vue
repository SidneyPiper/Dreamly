<template>
  <div class="flex flex-col h-full text-cloud">
    <div class="flex flex-col-reverse items-stretch">
      <Dream v-for="dream in dreamsStore.dreams" :key="dream.id" :dream="dream"
             class="first:border-none border-b-4 border-b-stone-950"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: 'auth',
  layout: 'default',
  pageTransition: {name: 'fade-page'},
  layoutTransition: {name: 'stay'}
})

const dreamsStore = useDreamsStore()
await dreamsStore.fetch()

</script>