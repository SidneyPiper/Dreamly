<template>
  <div class="flex flex-col grow group w-full gap-1.5" @click="click">
    <div id="editor-title"
         ref="titleRef"
         :contenteditable="editable"
         class="text-3xl resize-none break-words pt-0 text-wrap px-4 font-bold pb-0 border-0 block w-full focus:border-none focus:ring-0 focus:shadow-none focus:outline-0 bg-transparent"
         tabindex="0" type="text"
         @input="calcTitleEmpty"
         @keydown.down.prevent="down"
         @keydown.right="right"
         @keydown.enter.prevent="handleInputEnter">{{ dream?.title }}
    </div>
    <textarea id="editor-content" ref="contentRef" :readonly="titleEmpty || !props.editable"
              class="block grow px-4 w-full min-h-fit resize-none pt-0 border-0 cursor-text focus:border-none focus:ring-0 bg-transparent"
              @keydown.up="up"
              @keydown.left="left"
              @keydown.backspace="left"
    >{{ dream?.content }}</textarea>
  </div>
</template>

<script lang="ts" setup>
import type {Dream} from "~/stores/dreams";

const props = defineProps<{
  dream?: Dream,
  editable?: boolean
}>()

const titleRef = ref<HTMLInputElement>()
const contentRef = ref<HTMLTextAreaElement>()

onMounted(() => {
  titleRef.value?.focus()
  calcTitleEmpty()
})

const titleEmpty = ref<boolean>(false)

const calcTitleEmpty = () => {
  titleEmpty.value = titleRef.value?.innerText.length == 1 || titleRef.value?.innerText.length == 0
}


const handleInputEnter = () => {
  if (titleRef.value!.innerText.length > 0) {
    focusContent()
  }
}

const setTitleEmpty = () => {
  titleEmpty.value = false
}

const focusContent = () => {
  contentRef.value!.focus({preventScroll: true})
}

const focusTitle = () => {
  titleRef.value!.focus({preventScroll: true})
}

const click = (event: Event) => {
  if (titleEmpty.value) {
    event.preventDefault()
    titleRef.value!.focus({preventScroll: true})
  }
}

const down = () => {
  const offset = document.getSelection()!.anchorOffset
  focusContent()
  contentRef.value!.selectionStart = offset
  contentRef.value!.selectionEnd = offset
}

const right = (event: Event) => {
  const selection = document.getSelection()!
  if (selection.type == 'Caret' && selection.anchorOffset >= titleRef.value!.innerText.length) {
    event.preventDefault()
    focusContent()
    contentRef.value!.selectionStart = 0
    contentRef.value!.selectionEnd = 0
  }
}

const up = (event: Event) => {
  if (!contentRef.value!.value.substring(0, contentRef.value!.selectionStart).includes('\n')) {
    event.preventDefault()
    titleRef.value!.focus({preventScroll: true})
    setCursorPosition(titleRef.value!, contentRef.value!.selectionStart)
  }
}

const left = (event: Event) => {
  if (contentRef.value!.selectionStart == 0 && contentRef.value!.selectionEnd == 0) {
    event.preventDefault()
    titleRef.value!.focus({preventScroll: true})
    setCursorPosition(titleRef.value!, titleRef.value!.innerText.length)
  }
}

const setCursorPosition = (contentEditableElement: HTMLElement, position: number) => {
  const range = document.createRange();
  const selection = window.getSelection();

  contentEditableElement.focus();

  if (contentEditableElement.childNodes.length === 0) {
    const textNode = document.createTextNode("");
    contentEditableElement.appendChild(textNode);
  }

  const textNode = contentEditableElement.childNodes[0] as Text;
  const safePosition = Math.min(position, textNode.length);

  range.setStart(textNode, safePosition);
  range.collapse(true);
  selection!.removeAllRanges();
  selection!.addRange(range);
}

const get = () => {
  return [titleRef.value?.innerText!, contentRef.value?.value!]
}

const reset = () => {
  titleRef.value!.innerText = props.dream!.title
  contentRef.value!.value = props.dream!.content
}

defineExpose<{
  get: () => string[],
  focusContent: () => void
  setTitleEmpty: () => void,
  focusTitle: () => void,
  reset: () => void
}>({
  get,
  focusContent,
  setTitleEmpty,
  focusTitle,
  reset
})
</script>