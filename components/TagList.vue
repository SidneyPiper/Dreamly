<template>
  <div v-if="props.tags.length > 0" class="flex relative gap-2 items-center transition-all">
    <TransitionGroup name="fade" @before-leave="beforeLeave">
      <button v-for="tag in props.tags" :key="tag.id" @click="click(tag)" :disabled="!editable">
        <Tag :hex="tag.color.hex">
          {{ tag.label }}
        </Tag>
      </button>
    </TransitionGroup>
  </div>
</template>

<script lang="ts" setup>
import {type TagWithColor} from '~/prisma/types'

const emit = defineEmits<{
  (e: 'click', tag: TagWithColor): void
}>()

const props = defineProps<{
  tags: TagWithColor[],
  editable: boolean
}>()

const beforeLeave = (el: any) => {
  el.disabled = true

  const relativeLeft = el.offsetLeft;
  el.style.position = 'absolute';
  el.style.left = relativeLeft + 'px';
}

const click = (tag: TagWithColor) => {
  if (props.editable) emit('click', tag)
}
</script>