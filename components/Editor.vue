<template>
  <div class="flex flex-col grow w-full">
    <div ref="inputRef" class="text-wrap first-line:text-3xl break-words grow px-4 focus:outline-none"
         :contenteditable="editable"
         tabindex="0"
         @keydown.enter.exact.prevent="lineBreak" @input="highlight">
      <template v-if="dream.title && dream.content">{{ dream.title }}<br>{{ dream.content }}<br>
      </template>
      <template v-else><br></template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type {DreamWithTags} from "~/prisma/types";

const inputRef = ref()

const props = defineProps<{
  dream: DreamWithTags
  editable: boolean
}>()

onMounted(() => {
  focus()
})

const focus = () => {
  inputRef.value!.focus({preventScroll: true})
}

const get = (): [string, string] => {
  const newlineIndex = inputRef.value!.innerText.indexOf('\n');

  if (newlineIndex === -1) {
    return [inputRef.value!.innerText, ""];
  }

  const title = inputRef.value!.innerText.substring(0, newlineIndex);
  const content = inputRef.value!.innerText.substring(newlineIndex + 1);

  return [title, content];
}

const lineBreak = () => {
  const selection = window.getSelection();
  const range = selection!.getRangeAt(0);

  const br = document.createElement('br');
  range.insertNode(br);

  const cursorPosition = range.endOffset; // Store cursor position

  range.setStartAfter(br);
  range.setEndAfter(br);

  selection!.removeAllRanges();
  selection!.addRange(range);

  highlight();

  // Restore cursor position
  const newRange = document.createRange();
  newRange.setStart(inputRef.value, cursorPosition);
  newRange.collapse(true);
  selection!.removeAllRanges();
  selection!.addRange(newRange);
}


const reset = () => {
  inputRef.value.innerHTML = props.dream.title + '<br>' + props.dream.content + '<br>'
}

const highlight = () => {
  const editor = inputRef.value;
  let text = editor.innerHTML;

  text = text.replace('<span style="font-size: 36px">', '').replace('</span>', '');
  // Split content by line breaks
  const lines = text.split('<br>');

  // Highlight the first line
  lines[0] = `<span style="font-size: 36px">${lines[0]}</span>`;

  // Store current selection
  const selection = window.getSelection();
  const range = selection!.getRangeAt(0);
  const selectedNode = range.commonAncestorContainer;
  const selectedOffset = range.endOffset;

  // Get the length of text before cursor
  let textBeforeCursorLength = 0;
  const iterator = document.createNodeIterator(editor, NodeFilter.SHOW_TEXT);
  let currentNode;
  while (currentNode = iterator.nextNode()) {
    if (currentNode === selectedNode) {
      textBeforeCursorLength += selectedOffset;
      break;
    }
    textBeforeCursorLength += currentNode.textContent.length;
  }

  // Update editor content
  editor.innerHTML = lines.join('<br>');

  // Restore selection
  const newIterator = document.createNodeIterator(editor, NodeFilter.SHOW_TEXT);
  let newTextBeforeCursorLength = 0;
  let newRange = document.createRange();
  let newSelection = window.getSelection();
  let newTextBeforeCursorNode;
  let newNode;
  while (newNode = newIterator.nextNode()) {
    if (newTextBeforeCursorLength + newNode.textContent.length >= textBeforeCursorLength) {
      newTextBeforeCursorNode = newNode;
      break;
    }
    newTextBeforeCursorLength += newNode.textContent.length;
  }
  newRange.setStart(newTextBeforeCursorNode, textBeforeCursorLength - newTextBeforeCursorLength);
  newRange.collapse(true);
  newSelection!.removeAllRanges();
  newSelection!.addRange(newRange);
}


defineExpose<{
  get: () => [string, string],
  focus: () => void
  reset: () => void
}>({
  get,
  focus,
  reset
})
</script>

<style scoped>
.highlighted {
  background: blue;
}
</style>
