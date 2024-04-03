<template>
  <div ref="containerRef"
       class="flex flex-col h-dvh font-sans text-stone-950 bg-cloud dark:text-white dark:bg-stone-900">
    <slot/>
  </div>
</template>

<script setup>
const containerRef = ref(null)

const resizeHandler = (event) => {
  const height = event.target.height
  containerRef.value.style.height = height + 'px'
  window.scrollTo(0, 0)
}

onMounted(() => {
  window.visualViewport.addEventListener('resize', resizeHandler)
})

onBeforeUnmount(() => {
  window.visualViewport.removeEventListener('resize', resizeHandler)
})

</script>