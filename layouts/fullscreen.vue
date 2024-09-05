<template>
  <div
      class="flex flex-col lg:flex-row-reverse lg:justify-center lg:gap-12 h-dvh lg:min-h-dvh lg:h-auto font-sans text-stone-950 bg-cloud dark:text-white dark:bg-stone-900">
    <div class="grow overflow-y-auto relative lg:max-w-2xl">
      <slot/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {setPageScrollPositions} from "stores/scroll";

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
</script>