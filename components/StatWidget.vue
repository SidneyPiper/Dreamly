<template>
  <div class="rounded-xl bg-white dark:bg-stone-950 text-center grow p-2">
    <p class="text-2xl">{{ props.value }}</p>
    <p class="text-lg">{{ props.title }}</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  value: any,
  title: string,
}>()
</script>