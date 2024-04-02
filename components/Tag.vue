<template>
    <span
        class="flex items-center font-medium justify-center px-3 py-0.5 text-stone-700 rounded-full whitespace-nowrap select-none">
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
  box-shadow: inset 0 1px 3px 1px rgba(0, 0, 0, 0.3);
}

@media (prefers-color-scheme: light) {
  span {
    box-shadow: inset 0 1px 2px 1px rgba(0, 0, 0, 0.25);
  }
}
</style>