<template>
  <div ref="containerRef"
       class="flex flex-col lg:flex-row-reverse lg:justify-center lg:gap-12 h-dvh lg:min-h-dvh lg:h-auto font-sans text-stone-950 bg-cloud dark:text-white dark:bg-stone-900">
    <div class="flex flex-col grow overflow-y-scroll relative lg:max-w-2xl" data-scrollable="main">
      <slot/>
    </div>
    <div class="shrink-0">
      <div class="lg:sticky lg:top-6">
        <div class="items-center hidden lg:flex gap-3 lg:mt-6">
          <img :src="Logo" alt="Logo" class="w-8 h-8 "/>
          <h1 class="text-2xl font-bold">Dreamly</h1>
        </div>
        <Tabs v-if="navbarStore.open" class="pb-4 lg:pb-0"/>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Logo from "assets/images/logo.png";
import {setPageScrollPositions} from "stores/scroll";
import {useNavbarStore} from "stores/navbar";
import {useRoute} from "#app";

const navbarStore = useNavbarStore()

onBeforeRouteLeave((to, from, next) => {
  if (from.meta.preserveScroll) {
    const windowScroll = window.scrollY
    const containerScroll: { [key: string]: number } = {}

    document.querySelectorAll('[data-scrollable]').forEach((c) => {
      if (c.hasAttribute('data-scrollable'))
        containerScroll[c.getAttribute('data-scrollable')!] = c.scrollTop;
    })

    setPageScrollPositions(from.fullPath, {
      window: windowScroll,
      containers: containerScroll,
    })
  }
  next()
})

onBeforeRouteUpdate((to, from, next) => {
  navbarStore.showNavbar()
  next()
})

const containerRef = ref(null)

const resizeHandler = (event: any) => {
  if (useRoute().meta.resize) {
    const height = event.target.height
    containerRef.value.style.height = height + 'px'
    useNavbarStore().screenHeight = height
    window.scrollTo(0, 0)
  }
}

onMounted(() => {
  window.visualViewport.addEventListener('resize', resizeHandler)
})

onBeforeUnmount(() => {
  window.visualViewport.removeEventListener('resize', resizeHandler)
})
</script>