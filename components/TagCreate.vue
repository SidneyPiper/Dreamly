<template>
  <IconButton class="flex p-4 items-center justify-center aspect-square h-full" @click="open">
    <PlusIcon class="w-6 h-6 stroke-[1.5px] stroke-stone-950 dark:stroke-white"/>
  </IconButton>
  <Transition>
    <div v-if="isOpen"
         class="fixed top-0 left-0 flex flex-col grow w-full h-dvh z-30 bg-cloud dark:bg-stone-900">

      <!-- Header -->
      <div class="flex justify-between items-center p-4">
        <TextButton @click="close">Close</TextButton>
        <PrimaryButton v-if="id === null" :disabled="label.length == 0" @click="addTag">Add</PrimaryButton>
        <PrimaryButton v-else :disabled="label.length == 0" @click="saveTag">Save</PrimaryButton>
      </div>

      <!-- Edit Section -->
      <div class="flex flex-col gap-5 py-6 px-4">
        <div class="flex justify-center">
          <Tag :hex="selectedColor?.hex">{{ label || 'Preview' }}</Tag>
        </div>
        <div class="flex justify-center">
          <input ref="inputRef" v-model="label"
                 class="bg-transparent text-2xl flex-1 min-w-0 font-medium border-1 py-2.5 rounded-xl focus:border-cloud focus:ring-0 focus:shadow-none focus:outline-0 focus:placeholder:opacity-0 text-center"
                 type="text"
                 maxlength="32">
        </div>
        <div class="flex justify-center">
          <ColorPicker @select="colorSelect" v-model="selectedColor"/>
        </div>
      </div>

      <!-- Taglist -->
      <div class="flex flex-wrap gap-3 gap-y-4 justify-center px-2 overflow-y-auto overflow-x-hidden">
        <Tag v-for="tag in tagsStore.tags" :key="tag.id" class="w-min py-0 !px-0 flex" :hex="tag.color.hex"
             @click="handleEdit(tag)">
          <p class="pl-3">{{ tag.label }}</p>
          <button @click.stop="handleDelete(tag)" class="px-3 py-1 rounded-l-full">
            <TrashIcon class="w-5 aspect-square"/>
          </button>
        </Tag>
      </div>

      <!-- Confirmation Dialog -->
      <Transition name="expand">
        <div v-if="confirm" class="mt-auto" v-click-outside="() => confirm = null">
          <div>
            <div class="flex p-4 bg-stone-800 flex-col gap-3">
              <h3 class="text-lg font-semibold">Are you sure?</h3>
              <p>This tag will be deleted and removed from all you dreams. This action is irreversible!</p>
              <div class="flex items-center gap-3 grow justify-between flex-wrap">
                <div class="grow-[99999]">
                  <Tag :hex="confirm.color.hex" class="inline w-min shrink">{{ confirm.label }}</Tag>
                </div>
                <div class="flex gap-x-2 gap-y-3 items-stretch shrink-0 grow">
                  <SecondaryButton @click="confirm = null" class="grow justify-center">Cancel</SecondaryButton>
                  <PrimaryButton @click="handleConfirm" class="bg-red-600 grow justify-center">Confirm</PrimaryButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import {PlusIcon} from '@heroicons/vue/24/outline';
import {type Color, type TagWithColor} from '~/prisma/types'
import {useTagsStore} from "~/stores/tags";
import {TrashIcon} from "@heroicons/vue/24/outline";

const emit = defineEmits<{
  (e: 'close'): void
}>()

const tagsStore = useTagsStore()

onMounted(async () => {
  await tagsStore.fetch()
})

const isOpen = ref<boolean>(false)
const inputRef = ref<HTMLInputElement | null>()

const label = ref<string>('')
const selectedColor = ref<Color | null>()
const id = ref<string | null>(null)

const confirm = ref<TagWithColor | null>(null)

const open = () => {
  isOpen.value = true
  reset()
}

const close = () => {
  isOpen.value = false
  reset()
  emit('close')
}

const reset = () => {
  label.value = ''
  selectedColor.value = null
  id.value = null
}

const colorSelect = () => {
  inputRef.value!.focus()
}

const addTag = async () => {
  await tagsStore.create({
    label: label.value,
    color: selectedColor.value!
  }).then(() => {
    reset()
  })
}

const saveTag = async () => {
  await tagsStore.update({
    id: id.value!,
    label: label.value,
    color: selectedColor.value!
  }).then(() => {
    reset()
  })
}

const handleDelete = async (tag: TagWithColor) => {
  confirm.value = tag
}

const handleConfirm = async () => {
  await tagsStore.destroy(confirm.value!)
  confirm.value = null
}

const handleEdit = (tag: TagWithColor) => {
  id.value = tag.id
  label.value = tag.label
  selectedColor.value = tag.color
  inputRef.value!.focus()
}
</script>

<style scoped>
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: top 0.2s ease-out;
  position: fixed;
}

.v-enter-from,
.v-leave-to {
  top: 100dvh !important;
}
</style>
