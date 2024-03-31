<template>
    <div class="flex flex-col grow pt-4 gap-2">
        <div class="flex justify-between items-center px-4">
            <TextButton to="/home">Cancel</TextButton>
            <PrimaryButton>Save</PrimaryButton>
        </div>
        <div class="flex flex-col grow group w-full" @click="handleClick">
            <div @input="handleInputChange" type="text" ref="inputRef" @keydown.down="handleInputKeyDown"
                @keydown.right="handleInputKeyRight" @keypress.enter="handleInputEnter" contenteditable="true"
                tabindex="0"
                class="text-3xl resize-none break-words text-wrap px-4 font-bold pb-1 border-0 block w-full focus:border-none focus:ring-0 focus:shadow-none focus:outline-0 bg-transparent">
            </div>
            <div class="flex flex-wrap relative gap-2 items-center px-4 transition-all"
                :class="{ 'py-2': selectedTags.length > 0 }">
                <TransitionGroup name="fade" @before-leave="beforeLeave">
                    <button v-for="tag in selectedTags" :key="tag.name" @click="handleRemoveTag(tag)">
                        <Tag :hex="tag.hex">
                            {{ tag.name }}
                        </Tag>
                    </button>
                </TransitionGroup>
            </div>
            <textarea ref="textareaRef" @keydown.up="handleTextareaKeyUp" @keydown.left="handleTextareaKeyLeft"
                @keydown.backspace="handleTextareaBackspace" :readonly="readonly"
                class="block grow px-4 w-full resize-none pt-0 border-0 cursor-text focus:border-none focus:ring-0 bg-transparent"
                rows="3"></textarea>
        </div>
        <div class="flex items-stretch bg-white dark:bg-stone-950">
            <IconButton @click="handleTagMenuOpen" class="flex items-center justify-center aspect-square h-full">
                <PlusIcon class="w-6 h-6 stroke-[1.5px] stroke-stone-950 dark:stroke-white" />
            </IconButton>
            <div
                class="relative h-14 w-full overflow-hidden before:absolute before:z-10 before:h-full before:w-1 before:bg-gradient-to-r before:from-white dark:before:from-stone-950 before:to-transparent after:absolute after:z-10 after:h-full after:w-1 after:right-0 after:top-0 after:bg-gradient-to-l dark:after:from-stone-950 after:from-white after:to-transparent">
                <div class="flex relative w-full h-full gap-2 overflow-scroll items-center py-3 px-1">
                    <TransitionGroup name="fade" @before-leave="beforeLeave">
                        <button v-for="tag in availableTags" :key="tag.name" @click="handleSelectTag(tag)">
                            <Tag :hex="tag.hex">
                                {{ tag.name }}
                            </Tag>
                        </button>
                    </TransitionGroup>
                </div>
            </div>
        </div>
    </div>
    <div v-if="tagMenu" class="absolute flex flex-col grow pt-4 gap-16 w-full h-dvh z-30 bg-cloud dark:bg-stone-900">
        <div class="flex justify-between items-center px-4">
            <TextButton @click="handleTagMenuClose">Close</TextButton>
            <PrimaryButton :disabled="preview.length == 0">Add</PrimaryButton>
        </div>
        <div class="flex flex-col gap-5">
            <div class="flex justify-center">
                <Tag :hex="selectedColor">{{ preview || 'Preview' }}</Tag>
            </div>
            <div class="flex justify-center">
                <input ref="tagInputRef" type="text"
                    class="bg-transparent text-2xl font-medium border-none focus:border-none focus:ring-0 focus:shadow-none focus:outline-0 focus:placeholder:opacity-0 text-center"
                    v-model="preview" placeholder="name your tag...">
            </div>
            <div class="flex justify-center">
                <ColorPicker :colors="colors"
                    @change-selected-color="(color) => { selectedColor = color; tagInputRef.focus() }" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { PlusIcon } from '@heroicons/vue/24/outline';

definePageMeta({
    middleware: 'auth',
    layout: 'fullscreen',
    layoutTransition: { name: 'slide-up' }
})

const colors = ['#FDE4CF', '#FFCFD2', '#F1C0E8', '#CFBAF0', '#A3C4F3', '#90DBF4', '#8EECF5', '#98F5E1', '#B9FBC0']
const selectedColor = ref(null)

const availableTags = ref([
    { name: 'OCaml', hex: '#FDE4CF' },
    { name: 'Monade', hex: '#FFCFD2' },
    { name: 'Funktor', hex: '#F1C0E8' },
    { name: 'Nuxt', hex: '#CFBAF0' },
    { name: 'Party Nuts', hex: '#A3C4F3' },
    { name: 'Haskell', hex: '#90DBF4' },
    { name: 'Sigma', hex: '#8EECF5' },
    { name: 'NSFW', hex: '#98F5E1' },
    { name: 'Rust', hex: '#B9FBC0' }
])

const selectedTags = ref([])

const inputRef = ref(null)
const textareaRef = ref(null)
const readonly = ref(true)

const tagMenu = ref(false)

const preview = ref('')
const tagInputRef = ref(null)

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
    textareaRef.value.focus({ preventScroll: true })
}

const handleClick = (event) => {
    if (inputRef.value.innerText.length === 1 || inputRef.value.innerText.length === 0) {
        event.preventDefault()
        inputRef.value.focus({ preventScroll: true })
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
        inputRef.value.focus({ preventScroll: true })
        setCursorPosition(inputRef.value, event.target.selectionStart)
    }
}

const handleTextareaKeyLeft = (event) => {
    if (event.target.selectionStart === 0 && event.target.selectionEnd === 0) {
        event.preventDefault()
        inputRef.value.focus({ preventScroll: true })
        setCursorPosition(inputRef.value, inputRef.value.innerText.length)
    }
}

const handleTextareaBackspace = (event) => {
    if (event.target.selectionStart === 0 && event.target.selectionEnd === 0) {
        event.preventDefault()
        inputRef.value.focus({ preventScroll: true })
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

const handleTagMenuOpen = async () => {
    tagMenu.value = true
    await nextTick()
    tagInputRef.value.focus()
}

const handleTagMenuClose = () => {
    tagMenu.value = false
    preview.value = ''
    inputRef.value.focus()
}

const handleSelectTag = (tag) => {
    selectedTags.value.push(tag)
    availableTags.value = availableTags.value.filter(x => x != tag)

    if (inputRef.value.innerText.length === 1 || inputRef.value.innerText.length === 0) {
        inputRef.value.focus()
    } else {
        textareaRef.value.focus()
    }
}

const handleRemoveTag = (tag) => {
    availableTags.value.push(tag)
    selectedTags.value = selectedTags.value.filter(x => x != tag)
    if (inputRef.value.innerText.length === 1 || inputRef.value.innerText.length === 0) {
        inputRef.value.focus()
    } else {
        textareaRef.value.focus()
    }
}

const beforeLeave = (el) => {
    const relativeLeft = el.offsetLeft;

    el.disabled = true

    el.style.position = 'absolute';
    el.style.left = relativeLeft + 'px';
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