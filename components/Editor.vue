<template>
  <div class="flex flex-col grow group w-full" @click="handleClick">
    <div ref="inputRef"
         class="text-3xl resize-none break-words pt-0 text-wrap px-4 font-bold pb-1 border-0 block w-full focus:border-none focus:ring-0 focus:shadow-none focus:outline-0 bg-transparent"
         contenteditable="true" tabindex="0"
         type="text" @input="handleInputChange" @keydown.down="handleInputKeyDown"
         @keydown.right="handleInputKeyRight"
         @keypress.enter="handleInputEnter">
    </div>
    <textarea ref="textareaRef" :readonly="readonly"
              class="block grow px-4 w-full resize-none pt-0 border-0 cursor-text focus:border-none focus:ring-0 bg-transparent"
              rows="3" @keydown.up="handleTextareaKeyUp"
              @keydown.left="handleTextareaKeyLeft"
              @keydown.backspace="handleTextareaBackspace"></textarea>
  </div>
</template>

<script setup>
const inputRef = ref(null)
const textareaRef = ref(null)
const readonly = ref(true)

onMounted(() => {
  inputRef.value.focus()
  inputRef.value.innerText = 'Haskell Objekt Orientierung'
  textareaRef.value.value = 'Letzte Nacht tauchte ich in einen Traum ein, der die Grenzen meiner gewohnten Welt der Programmierung herausforderte. Es war eine Reise in die Tiefen von Haskell, einem Land, das ich für seine rein funktionale Schönheit bewundere, doch dieses Mal öffnete sich mir eine völlig neue Perspektive: die Verbindung von Haskell mit Objektorientierter Programmierung (OOP). Ich fand mich selbst am Anfang eines Pfades wieder, der durch einen geheimnisvollen digitalen Wald führte.Der Wald symbolisierte Haskell\'s reines funktionales Ökosystem, durchzogen von Unveränderlichkeit und höheren Funktionen.Ich spürte, wie die Umgebung mich dazu einlud, die Konzepte der OOP in einer Welt zu erkunden, die ich bisher nur aus der funktionalen Perspektive kannte.Während ich weiterging, entdeckte ich, dass dieser Traum mir eine Brücke baute zwischen den funktionalen Paradigmen, die ich kannte, und den objektorientierten Mustern, die mir fremd waren.Vor mir erschienen Typklassen, Haskell\'s eigene Interpretation von Interfaces oder Protokollen, die ich aus OOP kannte. Diese Typklassen öffneten Türen zu Räumen, in denen Daten und Funktionen auf eine Weise zusammenkamen, die sowohl vertraut als auch neuartig war.'
  readonly.value = false
})

const handleInputChange = (event) => {
  readonly.value = inputRef.value.innerText.length == 1
  if (inputRef.value.innerText.length > 255) {
    event.preventDefault()
    focusTextarea()
  }
}

const handleInputEnter = (event) => {
  event.preventDefault()
  if (inputRef.value.innerText.length > 0) {
    focusTextarea()
  }
}

const focusTextarea = () => {
  textareaRef.value.focus({preventScroll: true})
}

const handleClick = (event) => {
  if (inputRef.value.innerText.length === 1 || inputRef.value.innerText.length === 0) {
    event.preventDefault()
    inputRef.value.focus({preventScroll: true})
  }
}

const handleInputKeyDown = (event) => {
  event.preventDefault()
  const offset = document.getSelection().anchorOffset
  focusTextarea()
  textareaRef.value.selectionStart = offset
  textareaRef.value.selectionEnd = offset
}

const handleInputKeyRight = (event) => {
  const selection = document.getSelection()
  if (selection.type == 'Caret' && selection.anchorOffset === event.target.innerText.length) {
    event.preventDefault()
    focusTextarea()
    textareaRef.value.selectionStart = 0
    textareaRef.value.selectionEnd = 0
  }
}

const handleTextareaKeyUp = (event) => {
  if (!event.target.value.substring(0, event.target.selectionStart).includes('\n')) {
    event.preventDefault()
    inputRef.value.focus({preventScroll: true})
    setCursorPosition(inputRef.value, event.target.selectionStart)
  }
}

const handleTextareaKeyLeft = (event) => {
  if (event.target.selectionStart === 0 && event.target.selectionEnd === 0) {
    event.preventDefault()
    inputRef.value.focus({preventScroll: true})
    setCursorPosition(inputRef.value, inputRef.value.innerText.length)
  }
}

const handleTextareaBackspace = (event) => {
  if (event.target.selectionStart === 0 && event.target.selectionEnd === 0) {
    event.preventDefault()
    inputRef.value.focus({preventScroll: true})
    setCursorPosition(inputRef.value, inputRef.value.innerText.length)
  }
}

const setCursorPosition = (contentEditableElement, position) => {
  const range = document.createRange();
  const selection = window.getSelection();
  contentEditableElement.focus();

  if (contentEditableElement.childNodes.length === 0) {
    const textNode = document.createTextNode("");
    contentEditableElement.appendChild(textNode);
  }

  const textNode = contentEditableElement.childNodes[0];

  const safePosition = Math.min(position, textNode.length);
  range.setStart(textNode, safePosition);
  range.collapse(true);

  selection.removeAllRanges();
  selection.addRange(range);
}
</script>
