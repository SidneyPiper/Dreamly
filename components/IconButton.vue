<template>
  <NuxtLink v-if="props.to" :to="props.to" class="flex flex-row gap-4 items-center py-4">
    <slot/>
  </NuxtLink>
  <button v-else class="flex flex-row gap-4 items-center py-4">
    <slot/>
  </button>
</template>

<script lang="ts" setup>
const props = defineProps<{
  to?: string
}>()
</script>