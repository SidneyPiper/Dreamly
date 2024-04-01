<template>
  <div class="flex flex-col grow pt-4 gap-4 h-dvh">

    <!-- Top bar -->
    <div class="flex justify-between items-center px-4">
      <TextButton to="/home">Cancel</TextButton>
      <PrimaryButton @click="addDream">Save</PrimaryButton>
    </div>

    <div class="flex flex-col grow overflow-y-scroll gap-2 transition-all">

      <!-- Chosen tags -->
      <TagList :tags="selected" class="px-4 flex-wrap" @click="unselect" />
      <!-- Editor -->
      <Editor ref="editorRef" />
    </div>

    <!-- Available tags -->
    <div class="flex items-stretch bg-white dark:bg-stone-950">
      <TagCreate @close="editorRef?.focus()" @created="fetchTags()" />
      <Fader>
        <TagList :tags="tags" class="overflow-x-scroll py-3 px-1" @click="select" />
      </Fader>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { type TagWithColor } from '~/prisma/types'
import type { Editor } from "#components";
import { useNotifications } from "~/composables/Notifications";

definePageMeta({
  middleware: 'auth',
  layout: 'fullscreen',
  layoutTransition: { name: 'slide-up' }
})

const tags = ref<TagWithColor[]>([])
const selected = ref<TagWithColor[]>([])

const editorRef = ref<InstanceType<typeof Editor> | null>()

const { notify } = useNotifications()

const fetchTags = async () => {
  const response = await $fetch<TagWithColor[]>('/api/tags', {
    method: 'GET'
  })

  tags.value = response.filter(tag => !selected.value.some(sTag => tag.id === sTag.id))
  sortTags()
}

const select = (tag: TagWithColor) => {
  selected.value.push(tag)
  tags.value = tags.value.filter(x => x != tag)
  sortTags()
  editorRef.value!.focus()
}

const unselect = (tag: TagWithColor) => {
  tags.value.push(tag)
  selected.value = selected.value.filter(x => x != tag)
  sortTags()
  editorRef.value!.focus()
}

const sortTags = () => {
  tags.value.sort((a: TagWithColor, b: TagWithColor) => a.label.localeCompare(b.label))
}

const addDream = () => {
  const [title, content] = editorRef.value.get()
  const tagIds = selected.value.map(x => x.id)

  $fetch('/api/dreams', {
    method: 'POST',
    body: {
      title: title,
      content: content,
      tags: tagIds
    },
  }).then(response => {
    notify(Level.SUCCESS, response.data.statusMessage)
    navigateTo('/home')
  }).catch(response => {
    notify(Level.DANGER, response.data.statusMessage)
  })
}

onMounted(() => {
  fetchTags()
})
</script>