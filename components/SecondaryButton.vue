<template>
  <NuxtLink v-if="props.to" :to="props.to"
            class="flex items-center justify-center text-center border-primary border-2 px-6 py-1 rounded-md">
    <slot/>
  </NuxtLink>
  <button v-else class="flex text-center justify-center items-center border-primary border-2 px-6 py-1 rounded-md">
    <slot/>
  </button>
</template>

<script lang="ts" setup>
const props = defineProps<{
  to?: string
}>()
</script>