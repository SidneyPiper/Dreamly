<template>
  <div class="space-y-1">
    <h2 class="font-bold" :class="small ? 'text-lg' : 'text-xl'">{{ label }}</h2>
    <slot/>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  label: string,
  small?: boolean
}>()
</script>
