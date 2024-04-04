<template>
  <div @click="onClick" class="flex flex-col px-4 py-6 cursor-pointer">
    <!-- Date -->
    <p class="text-xs mb-0.5 opacity-60 uppercase font-bold">{{
        new Date(dream.date).toLocaleDateString('en-us', {
          weekday: "long",
          month: "short",
          day: "numeric"
        })
      }}
    </p>

    <div class="flex mb-2 justify-between items-center gap-2">
      <!-- Title -->
      <h3 class="text-3xl font-semibold">{{ dream.title }}</h3>
    </div>

    <!-- Taglist -->
    <TagList :tags="dream.tags" :editable="true" class="mb-2 flex-wrap" @click="tag => emit('selectedTag', tag)"/>

    <!-- Content -->
    <p class="line-clamp-5">{{ dream.content }}</p>
  </div>
</template>

<script lang="ts" setup>
import {type DreamWithTags} from "~/prisma/types";
import {type TagWithColor} from '~/prisma/types'

const props = defineProps<{
  dream: DreamWithTags
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