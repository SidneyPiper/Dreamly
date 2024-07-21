<template>
  <div ref="wrapper" class="relative">
    <span ref="top" :style="{top: props.top + 'px'}" class="absolute"></span>
    <slot/>
    <span ref="bottom" :style="{bottom: props.bottom + 'px'}" class="absolute"></span>
  </div>
</template>

<script lang="ts" setup>
const props = withDefaults(defineProps<{
  top?: number
  bottom?: number
}>(), {
  top: 0,
  bottom: 0
})

const emit = defineEmits<{
  (e: 'top'): void
  (e: 'bottom'): void
}>()

const top = ref<HTMLSpanElement>()
const bottom = ref<HTMLSpanElement>()

const isScrollable = ref<boolean>(false)

defineExpose({isScrollable})

onMounted(() => {
  const observer_top = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
    if (entries[0].isIntersecting) emit('top')
  })
  observer_top.observe(top.value!)

  const observer_bot = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
    isScrollable.value = !entries[0].isIntersecting
    if (entries[0].isIntersecting) {
      emit('bottom')
    }
  })
  observer_bot.observe(bottom.value!)
})
</script>