<template>
  <div class="flex flex-col grow pt-4 gap-4 h-full">

    <!-- Top bar -->
    <div class="flex justify-between items-center px-4">
      <TextButton v-if="!create && edit" @click="editOff">Cancel</TextButton>
      <TextButton v-else @click="$router.back()">Cancel</TextButton>

      <!-- Date -->
      <p class="text-xs mb-0.5 opacity-60 uppercase font-bold text-cloud">{{
          new Date(dream.date).toLocaleDateString('en-us', {
            weekday: "long",
            month: "short",
            day: "numeric"
          })
        }}
      </p>
      <PrimaryButton v-if="edit" @click="save">Save</PrimaryButton>
      <PrimaryButton v-else @click="edit = true; focusEditor()">Edit</PrimaryButton>
    </div>

    <div class="flex flex-col grow overflow-y-scroll gap-2 transition-all text-cloud">

      <!-- Chosen tags -->
      <TagList :editable="edit" :tags="selectedTags" class="px-4 flex-wrap" @click="unselect"/>

      <!-- Editor -->
      <Editor ref="editorRef" :dream="dream" :editable="edit"/>
    </div>

    <!-- Available tags -->
    <div v-if="edit" class="flex items-stretch bg-white dark:bg-stone-950 shrink-0">
      <TagCreate @close="focusEditor"/>
      <Fader>
        <TagList :editable="edit" :tags="availableTags" class="overflow-x-scroll py-3 px-1" @click="select"/>
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

const tagsStore = useTagsStore()

onMounted(async () => {
  await dreamsStore.fetch()
  await tagsStore.fetch()

  if ('id' in route.params && route.params.id) {
    dream.value = await dreamsStore.get(route.params.id)
    selectedTags.value = [...dream.value.tags]
    edit.value = false
    create.value = false
  }
})

const dream = ref<Dream>(dreamsStore.empty())

const selectedTags = ref<TagWithColor[]>([])

const edit = ref<boolean>(true)
const create = ref<boolean>(true)


const editorRef = ref<InstanceType<typeof Editor> | null>()

const availableTags = computed(() => {
  return tagsStore.tags.filter((tag) => {
    return !selectedTags.value.some(t => t.id == tag.id)
  }).sort((a: TagWithColor, b: TagWithColor) => {
    return a.label.localeCompare(b.label)
  })
})

const save = async () => {
  const [title, content] = editorRef.value!.get()
  dream.value.title = title
  dream.value.content = content
  dream.value.tags = selectedTags.value

  dreamsStore.update(dream.value).then(() => {
    navigateTo('/home')
  })
}

const focusEditor = () => {
  editorRef.value!.focus()
}

const select = (tag: TagWithColor) => {
  selectedTags.value.push(tag)
  focusEditor()
}

const unselect = (tag: TagWithColor) => {
  selectedTags.value = selectedTags.value.filter(x => x != tag)
  focusEditor()
}

const editOff = async () => {
  edit.value = false

  selectedTags.value = [...dream.value.tags]
  editorRef.value?.reset()
}
</script>