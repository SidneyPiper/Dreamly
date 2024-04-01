<template>
  <Transition name="expand">
    <div v-if="props.tags.length > 0">
      <div class="flex relative gap-2 items-center transition-all">
        <TransitionGroup name="fade" @before-leave="beforeLeave">
          <button v-for="tag in props.tags" :key="tag.id" @click="emit('click', tag)">
            <Tag :hex="tag.color.hex">
              {{ tag.label }}
            </Tag>
          </button>
        </TransitionGroup>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import {type TagWithColor} from '../prisma/types'

const emit = defineEmits<{
  (e: 'click', tag: TagWithColor): void
}>()

const props = defineProps<{
  tags: TagWithColor[]
}>()

const beforeLeave = (el: any) => {
  el.disabled = true

  const relativeLeft = el.offsetLeft;
  el.style.position = 'absolute';
  el.style.left = relativeLeft + 'px';
}
</script>