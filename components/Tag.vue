<template>
    <span class="flex items-center justify-center px-3 py-1 text-stone-700 rounded-full whitespace-nowrap select-none">
        <slot/>
    </span>
</template>

<script lang="ts" setup>
defineProps<{
  hex?: string
}>()
</script>

<style scoped>
span {
  background-color: v-bind(hex);
  box-shadow: inset 0px 1px 4px 1px rgba(0, 0, 0, 0.3);
}

@media (prefers-color-scheme: light) {
  span {
    box-shadow: inset 0px 1px 3px 1px rgba(0, 0, 0, 0.25);
  }
}
</style>