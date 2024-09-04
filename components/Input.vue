<template>
  <div
      class="flex items-center gap-0.5 bg-white text-stone-950 w-full rounded-md border-gray-300 shadow-sm focus-within:border-transparent focus-within:ring focus-within:ring-primary"
      :class="props.class">
    <input v-bind="$attrs"
           v-model="model"
           class="bg-transparent border-0 focus:outline-none focus:ring-0 p-1 grow">
    <CheckIcon class="w-5 h-5 shrink-0 stroke-green-600 stroke-2" v-show="model && validateFn(model)"/>
  </div>
</template>

<script setup lang="ts">
import {CheckIcon} from '@heroicons/vue/24/outline'

const model = defineModel<string>()

const props = withDefaults(defineProps<{
  validateFn?: (str: string) => boolean,
  class?: string
}>(), {
  validateFn: () => false
})
</script>
