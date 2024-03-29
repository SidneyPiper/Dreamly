<template>
    <div class="flex flex-col grow pt-4 gap-2">
        <div class="flex justify-between items-center px-4">
            <NuxtLink to="/home">Cancel</NuxtLink>
            <button class="flex items-center bg-primary px-4 rounded-xl pb-1 text-white">Save</button>
        </div>
        <div class="flex flex-col grow group w-full" @click="handleClick">
            <div @input="handleInputChange" type="text" ref="inputRef" @keydown.down="handleInputKeyDown"
                @keydown.right="handleInputKeyRight" @keypress.enter="handleInputEnter" contenteditable="true"
                tabindex="0"
                class="text-xl resize-none break-words text-wrap px-4 font-bold pb-0 border-0 block w-full focus:border-none focus:ring-0 focus:shadow-none focus:outline-0 bg-transparent">
            </div>
            <textarea ref="textareaRef" @keydown.up="handleTextareaKeyUp" @keydown.left="handleTextareaKeyLeft"
                @keydown.backspace="handleTextareaBackspace" :readonly="readonly"
                class="block grow px-4 w-full resize-none pt-0 border-0 cursor-text focus:border-none focus:ring-0 bg-transparent"
                rows="3"></textarea>
        </div>
        <div class="flex items-center p-2 border-t-2 gap-2">
            <PencilIcon class="w-8 h-8 stroke-[1.5px] stroke-white" />
            <div class="flex gap-2 overflow-scroll items-center">
                <div class="bg-red-300 px-4 rounded-full pb-1">nsfw</div>
                <div class="bg-blue-300 px-4 rounded-full pb-1">John</div>
                <div class="bg-green-300 px-4 rounded-full pb-1">Uni</div>
                <div class="bg-yellow-300 px-4 rounded-full pb-1">Haskell</div>
                <div class="bg-red-300 px-4 rounded-full pb-1">nsfw</div>
                <div class="bg-blue-300 px-4 rounded-full pb-1">John</div>
                <div class="bg-green-300 px-4 rounded-full pb-1">Uni</div>
                <div class="bg-yellow-300 px-4 rounded-full pb-1">Haskell</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { PencilIcon } from '@heroicons/vue/24/outline';

definePageMeta({
    layout: 'fullscreen',
    layoutTransition: { name: 'slide-up' }
})

const inputRef = ref(null)
const textareaRef = ref(null)

const readonly = ref(true)

onMounted(() => {
    inputRef.value.focus()
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

<style>
.slide-up-enter-active,
.slide-up-leave-active {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
    transition: all 0.2s cubic-bezier(.18, .98, .7, .99);
}

.slide-up-enter-from,
.slide-up-leave-to {
    transform: translateY(100vh);
}
</style>