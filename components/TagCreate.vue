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
import {useNotifications} from "~/composables/Notifications";

const emit = defineEmits<{
  (e: 'created'): void,
  (e: 'close'): void
}>()

const {notify} = useNotifications()

const isOpen = ref<boolean>(false)
const inputRef = ref<HTMLInputElement | null>()

const error = ref<string | false>(false)

const label = ref<string>('')
const color = ref<Color | null>()

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
  let l = [Level.SUCCESS, Level.INFO, Level.DANGER, Level.WARNING][Math.floor(Math.random() * 4)]
  notify(l, "Success")
  /*$fetch('/api/tags', {
    method: 'POST',
    body: {
      label: label.value,
      colorId: color.value!.id
    },
  }).then(response => {


    //emit('created')
    //close()
  }).catch(response => {
    error.value = response.data.statusMessage
  })*/
}
</script>
