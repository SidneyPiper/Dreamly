<template>
  <div class="flex flex-col px-4 py-6 cursor-pointer gap-1.5" @click="onClick">
    <!-- Date -->
    <p class="text-xs mb-0.5 opacity-60 uppercase font-bold">{{
        new Date(dream.date).toLocaleDateString('en-us', {
          weekday: "long",
          month: "short",
          day: "numeric"
        })
      }}
    </p>

    <!-- Taglist -->
    <TagList :editable="true" :tags="dream.tags" class="flex-wrap" @click="tag => emit('selectedTag', tag)"/>

    <!-- Title -->
    <h3 class="text-3xl font-semibold">{{ dream.title }}</h3>

    <!-- Content -->
    <p class="line-clamp-5">{{ dream.content }}</p>
  </div>
</template>

<script lang="ts" setup>
import type {TagWithColor} from "~/prisma/types";
import type {Dream} from "~/stores/dreams"

const props = defineProps<{
  dream: Dream
}>()

const emit = defineEmits<{
  (e: 'selectedTag', tag: TagWithColor): void
}>()

const onClick = (event: MouseEvent) => {
  if (!(event.target as HTMLElement).hasAttribute('data-tag')) {
    navigateTo('/dream/' + props.dream.id)
  }
}
</script>