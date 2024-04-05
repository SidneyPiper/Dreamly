<template>
  <div class="relative">
    <slot/>
    <span ref="trigger" class="absolute" :style="{bottom: props.bottom + 'px'}"></span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  bottom: number
}>()

const emit = defineEmits<{
  (e: 'trigger'): void
}>()

const trigger = ref<HTMLSpanElement>()

onMounted(() => {
  const observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
    if (entries[0].isIntersecting) emit('trigger')
  })
  observer.observe(trigger.value!)
})
</script>