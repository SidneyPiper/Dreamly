<template>
  <div ref="containerRef"
       class="flex flex-col h-dvh font-sans text-stone-950 bg-cloud dark:text-white dark:bg-stone-900">
    <div class="flex flex-col items-stretch py-12 gap-8">
      <h1 class="text-4xl font-semibold text-center">Dreamly</h1>
      <slot/>
    </div>
  </div>
</template>

<script setup>
const containerRef = ref(null)

const resizeHandler = (event) => {
  console.log(event.target);
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