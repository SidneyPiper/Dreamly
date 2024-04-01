<template>
  <div v-if="props.vertical"
       class="relative w-full h-full overflow-hidden before:absolute before:z-10 before:w-full before:h-1 before:bg-gradient-to-b before:from-white dark:before:from-stone-950 before:to-transparent after:absolute after:z-10 after:w-full after:h-1 after:right-0 after:top-0 after:bg-gradient-to-t dark:after:from-stone-950 after:from-white after:to-transparent">
    <slot/>
  </div>
  <div v-else
       class="relative w-full h-full overflow-hidden before:absolute before:z-10 before:h-full before:w-1 before:bg-gradient-to-r before:from-white dark:before:from-stone-950 before:to-transparent after:absolute after:z-10 after:h-full after:w-1 after:right-0 after:top-0 after:bg-gradient-to-l dark:after:from-stone-950 after:from-white after:to-transparent">
    <slot/>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  vertical?: boolean
}>()
</script>
