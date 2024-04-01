<template>
  <div class="px-4">
    <TagList :tags="selected" class="overflow-x-scroll py-3" @click="unselect"/>
  </div>

  <slot/>


</template>

<script lang="ts" setup>
import {type TagWithColor} from '~/prisma/types'

const emit = defineEmits<{
  (e: 'update', selected: TagWithColor[]): void
}>()

const tags = ref<TagWithColor[]>([])
const selected = ref<TagWithColor[]>([])

const fetchTags = async () => {
  const response = await $fetch<TagWithColor[]>('/api/tags', {
    method: 'GET'
  })

  tags.value = response.filter(tag => !selected.value.some(sTag => tag.id === sTag.id))
}

const select = (tag: TagWithColor) => {
  selected.value.push(tag)
  tags.value = tags.value.filter(x => x != tag)
}

const unselect = (tag: TagWithColor) => {
  tags.value.push(tag)
  selected.value = selected.value.filter(x => x != tag)
}

onMounted(() => {
  fetchTags()
})
</script>