<template>
  <div class="flex flex-col grow w-full">
    <div ref="inputRef" class="text-wrap first-line:text-3xl break-words grow px-4 focus:outline-none"
         contenteditable="true"
         tabindex="0"
         @keydown.enter.exact.prevent="lineBreak"><br>
    </div>
  </div>
</template>

<script lang="ts" setup>
const inputRef = ref<HTMLDivElement>()

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

  range.setStartAfter(br);
  range.setEndAfter(br);

  selection!.removeAllRanges();
  selection!.addRange(range);

}

defineExpose<{
  get: () => [string, string],
  focus: () => void
}>({
  get,
  focus
})
</script>
