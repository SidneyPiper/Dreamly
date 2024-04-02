<template>
  <div class="flex flex-col grow pt-4 gap-4 h-dvh">

    <!-- Top bar -->
    <div class="flex justify-between items-center px-4">
      <TextButton to="/home">Cancel</TextButton>
      <!-- Date -->
      <p class="text-xs mb-0.5 opacity-60 uppercase font-bold">{{
          new Date(dream.date).toLocaleDateString('en-us', {
            weekday: "long",
            month: "short",
            day: "numeric"
          })
        }}
      </p>
      <PrimaryButton @click="save">Save</PrimaryButton>
    </div>

    <div class="flex flex-col grow overflow-y-scroll gap-2 transition-all">

      <!-- Chosen tags -->
      <TagList :tags="dream.tags" class="px-4 flex-wrap" @click="unselect"/>

      <!-- Editor -->
      <Editor ref="editorRef" :content="dream.content" :title="dream.title"/>
    </div>

    <!-- Available tags -->
    <div class="flex items-stretch bg-white dark:bg-stone-950">
      <TagCreate @close="focusEditor"/>
      <Fader>
        <TagList :tags="availableTags" class="overflow-x-scroll py-3 px-1" @click="select"/>
      </Fader>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type {TagWithColor} from '~/prisma/types'
import type {Editor} from "#components";
import {type Dream, useDreamsStore} from "~/stores/dreams";
import {useTagsStore} from "~/stores/tags";

definePageMeta({
  middleware: 'auth',
  layout: 'fullscreen',
  layoutTransition: {name: 'slide-up'}
})

const route = useRoute()

const dreamsStore = useDreamsStore()
dreamsStore.fetch()

const tagsStore = useTagsStore()
tagsStore.fetch()

const dream = ref<Dream>(dreamsStore.empty())

if ('id' in route.params && route.params.id) {
  dream.value = await dreamsStore.get(route.params.id)
}

const editorRef = ref<InstanceType<typeof Editor> | null>()

const availableTags = computed(() => {
  return tagsStore.tags.filter((tag) => {
    return !dream.value.tags.some(t => t.id == tag.id)
  }).sort((a: TagWithColor, b: TagWithColor) => {
    return a.label.localeCompare(b.label)
  })
})

const save = async () => {
  const [title, content] = editorRef.value!.get()
  dream.value.title = title
  dream.value.content = content

  dreamsStore.update(dream.value).then(() => {
    navigateTo('/home')
  })
}

const focusEditor = () => {
  editorRef.value!.focus()
}

const select = (tag: TagWithColor) => {
  dream.value.tags.push(tag)
  focusEditor()
}

const unselect = (tag: TagWithColor) => {
  dream.value.tags = dream.value.tags.filter(x => x != tag)
  focusEditor()
}
</script>