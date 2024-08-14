<template>
  <div class="flex flex-col grow pt-4 h-full">

    <!-- Top bar -->
    <div class="flex justify-between items-center px-4">
      <TextButton v-if="!create && edit" @click="editOff">Cancel</TextButton>
      <TextButton v-else @click="$router.back()">Cancel</TextButton>


      <div class="grow relative flex items-center justify-center">
        <Transition name="fade">
          <SecondaryButton v-if="!create && edit" class="border-red-600 text-red-600" @click="confirm = dream">Delete
          </SecondaryButton>
          <!-- Date -->
          <p v-else class="text-xs mb-0.5 opacity-60 uppercase font-bold">{{
              new Date(dream.date).toLocaleDateString('en-us', {
                weekday: "long",
                month: "short",
                day: "numeric"
              })
            }}
          </p>
        </Transition>
      </div>

      <PrimaryButton v-if="edit" @click="save">
        <p class="w-9">Save</p>
      </PrimaryButton>
      <PrimaryButton v-else @click="edit = true; focusEditor()">
        <p class="w-9">Edit</p>
      </PrimaryButton>
    </div>

    <div class="flex flex-col grow overflow-y-scroll gap-1.5 transition-all pt-4">

      <!-- Chosen tags -->
      <TagList :editable="edit" :tags="selectedTags" class="px-4 flex-wrap" @click="unselect"/>

      <!-- Editor -->
      <Editor ref="editorRef" :dream="dream" :editable="edit"/>
    </div>

    <Transition name="expand">
      <div v-if="confirm" v-click-outside="() => confirm = null" class="mt-auto">
        <div>
          <div class="flex p-4 bg-white dark:bg-stone-800 flex-col gap-3">
            <h3 class="text-lg font-semibold">Are you sure?</h3>
            <p>This tag will be deleted and removed from all you dreams. This action is irreversible!</p>
            <div class="flex items-center gap-3 grow justify-between flex-wrap">
              <div class="flex gap-x-2 gap-y-3 items-stretch shrink-0 grow">
                <SecondaryButton class="grow justify-center" @click="confirm = null">Cancel</SecondaryButton>
                <PrimaryButton class="bg-red-600 grow justify-center" @click="deleteDream">Confirm</PrimaryButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Available tags -->
    <div v-if="edit"
         class="flex items-stretch bg-white dark:bg-stone-950 lg:rounded-full lg:overflow-hidden lg:pr-5 lg:my-4 shrink-0">
      <TagCreate @close="focusEditor"/>
      <Fader class="text-white dark:text-stone-950">
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

const viewport = await useViewport()

if (!viewport.isLessThan('lg')) setPageLayout('default')
else setPageLayout('fullscreen')

watch(viewport.breakpoint, () => {
  if (!viewport.isLessThan('lg')) setPageLayout('default')
  else setPageLayout('fullscreen')
})

definePageMeta({
  middleware: 'auth',
  layout: 'fullscreen',
  layoutTransition: {name: 'slide-up'},
})

const route = useRoute()
const dreamsStore = useDreamsStore()
const tagsStore = useTagsStore()

const {back} = useRouter()
const confirm = ref<Dream | null>(null)

const dream = ref<Dream>(dreamsStore.empty())
const selectedTags = ref<TagWithColor[]>([])

const edit = ref<boolean>(true)
const create = ref<boolean>(true)

await tagsStore.fetch()

if ('id' in route.params && route.params.id) {
  dream.value = await dreamsStore.get(route.params.id)
  selectedTags.value = [...dream.value.tags]
  edit.value = false
  create.value = false
}

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

  await dreamsStore.update(dream.value)
  navigateTo('/home')
}

const focusEditor = () => {
  editorRef.value!.focusContent()
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

const deleteDream = async () => {
  await dreamsStore.destroy(dream.value)
  back()
}
</script>