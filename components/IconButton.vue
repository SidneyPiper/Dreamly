<template>
  <NuxtLink v-if="props.to" :to="props.to" class="flex flex-row gap-4 items-center justify-between py-4">
    <span class="flex items-center gap-3"><slot/></span>
    <CheckIcon v-show="props.selected" class="w-5 h-5"/>
  </NuxtLink>
  <button v-else class="flex flex-row gap-4 items-center justify-between py-4">
    <span class="flex items-center gap-3"><slot/></span>
    <CheckIcon v-show="props.selected" class="w-5 h-5"/>
  </button>
</template>

<script lang="ts" setup>
import {CheckIcon} from "@heroicons/vue/24/solid";

const props = defineProps<{
  to?: string,
  selected?: boolean
}>()
</script>