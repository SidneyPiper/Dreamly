<template>
  <div class="flex flex-col grow w-full">
    <div ref="inputRef" contenteditable="true" tabindex="0"
      class="text-wrap first-line:text-3xl break-words grow px-4 focus:outline-none"
      @keydown.enter.exact.prevent="lineBreak"><br>
    </div>
  </div>
</template>

<script setup lang="ts">
const inputRef = ref(null)

onMounted(() => {
  focus()
})

const focus = () => {
  inputRef.value.focus({ preventScroll: true })
}

const get = (): [string, string] => {
  const newlineIndex = inputRef.value.innerText.indexOf('\n');

  // If there's no '\n', return the whole string as the first part, and an empty string as the second part
  if (newlineIndex === -1) {
    return [inputRef.value.innerText, ""];
  }

  const title = inputRef.value.innerText.substring(0, newlineIndex);
  const content = inputRef.value.innerText.substring(newlineIndex + 1); // +1 to skip the '\n' character

  return [title, content];
}

const getContent = () => {

}

const lineBreak = () => {
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);

  const br = document.createElement('br');
  range.insertNode(br);

  range.setStartAfter(br);
  range.setEndAfter(br);

  selection.removeAllRanges();
  selection.addRange(range);

}

defineExpose({
  focus,
  get
})
</script>
