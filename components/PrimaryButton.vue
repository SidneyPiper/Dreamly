<template>
  <NuxtLink v-if="props.to" :to="props.to"
            class="flex items-center justify-center bg-primary px-6 py-1.5 rounded-md text-white shadow-md">
    <slot/>
  </NuxtLink>
  <button v-else
          class="flex items-center justify-center bg-primary px-6 py-1.5 rounded-md text-white shadow-md transition-all disabled:saturate-[25%]"
          type="submit">
    <slot/>
  </button>
</template>

<script lang="ts" setup>
const props = defineProps<{
  to?: string
}>()
</script>