<template>
  <IconButton class="flex p-4 items-center justify-center aspect-square h-full" @click="open">
    <PlusIcon class="w-6 h-6 stroke-[1.5px] stroke-stone-950 dark:stroke-white"/>
  </IconButton>
  <div v-if="isOpen"
       class="absolute top-0 left-0 py-4 flex flex-col grow gap-16 w-full h-dvh z-30 bg-cloud dark:bg-stone-900">
    <div class="flex justify-between items-center px-4">
      <TextButton @click="close">Close</TextButton>
      <PrimaryButton :disabled="label.length == 0" @click="addTag">Add</PrimaryButton>
    </div>

    <div class="flex flex-col gap-5">
      <div class="flex justify-center">
        <Tag :hex="color?.hex">{{ label || 'Preview' }}</Tag>
      </div>
      <div class="flex justify-center">
        <input ref="inputRef" v-model="label"
               class="bg-transparent text-2xl font-medium border-none focus:border-none focus:ring-0 focus:shadow-none focus:outline-0 focus:placeholder:opacity-0 text-center"
               type="text">
      </div>
      <div class="flex justify-center">
        <ColorPicker @select="colorSelect"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {PlusIcon} from '@heroicons/vue/24/outline';
import {type Color} from '~/prisma/types'
import {useTagsStore} from "~/stores/tags";

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
const color = ref<Color>()

const open = () => {
  isOpen.value = true
  label.value = ''
}

const close = () => {
  isOpen.value = false
  emit('close')
}

const colorSelect = (selected: Color) => {
  color.value = selected
  inputRef.value!.focus()
}

const addTag = async () => {
  tagsStore.create({
    id: '',
    label: label.value,
    color: color.value!
  }).then(() => {
    close()
  })
}
</script>
