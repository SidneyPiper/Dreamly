<template>
  <div
      class="flex flex-col lg:flex-row-reverse lg:justify-center lg:gap-12 h-dvh lg:min-h-dvh lg:h-auto font-sans text-stone-950 bg-cloud dark:text-white dark:bg-stone-900">
    <div class="grow overflow-y-scroll relative lg:max-w-2xl">
      <slot/>
    </div>
    <div class="shrink-0">
      <div class="lg:sticky lg:top-6">
        <div class="items-center hidden lg:flex gap-3 lg:mt-6">
          <img :src="Logo" alt="Logo" class="w-8 h-8 "/>
          <h1 class="text-2xl font-bold">Dreamly</h1>
        </div>
        <Tabs/>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Logo from "assets/images/logo.png";
</script>