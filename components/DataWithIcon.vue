<template>
  <div class="flex items-stretch bg-stone-800 rounded-md">
    <div class="flex items-center px-3 shrink-0">
      <slot/>
    </div>

    <input :value="props.value" class="grow px-0 block w-full bg-transparent border-transparent" disabled type="text">
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  value: string
}>()
</script>