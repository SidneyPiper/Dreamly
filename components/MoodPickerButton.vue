<template>
  <button :class="{'grow-[1.5]': grow}"
          class="flex items-center grow justify-center transition-all h-11 rounded-md relative overflow-hidden">
    <Transition name="bfade">
      <CheckIcon v-if="highlight"
                 class="w-6 h-6 text-stone-950 stroke-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform-gpu"/>
    </Transition>
  </button>
</template>

<script lang="ts" setup>
import {CheckIcon} from '@heroicons/vue/24/outline'

defineProps<{
  grow: boolean
  highlight: boolean
}>()
</script>

<style scoped>
.bfade-move,
.bfade-enter-active,
.bfade-leave-active {
  transition: all 0.15s 0.1s cubic-bezier(0.55, 0, 0.1, 1);
}

.bfade-enter-from,
.bfade-leave-to {
  opacity: 0;
  @apply translate-y-1/2
}
</style>
