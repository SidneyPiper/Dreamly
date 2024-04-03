<template>
  <div class="flex flex-col odd:bg-stone-800 px-4 py-6">

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

      <!-- Edit button -->
      <IconButton :to="'/dream/' + dream.id" class="p-2 shrink-0">
        <EllipsisHorizontalIcon class="w-6 h-6"/>
      </IconButton>
    </div>

    <!-- Taglist -->
    <TagList :tags="dream.tags" :editable="false" class="mb-2 flex-wrap"/>

    <!-- Content -->
    <p>{{ dream.content }}</p>
  </div>
</template>

<script lang="ts" setup>
import {EllipsisHorizontalIcon} from "@heroicons/vue/24/outline";
import {type DreamWithTags} from "~/prisma/types";

const props = defineProps<{
  dream: DreamWithTags
}>()
</script>