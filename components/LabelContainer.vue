<template>
  <div class="flex flex-col bg-white dark:bg-stone-950 px-4 pt-4 rounded-xl">
    <div class="text-xl font-bold">{{ props.label }}</div>
    <div class="flex flex-col items-stretch divide-y divide-cloud dark:divide-stone-800">
      <slot/>
    </div>
  </div>
</template>

<script lang="ts" setup>

const props = defineProps<{
  label: string
}>()

</script>