<template>
  <div
      class="flex flex-col lg:flex-row-reverse lg:justify-center lg:gap-12 h-dvh lg:min-h-dvh lg:h-auto font-sans text-stone-950 bg-cloud dark:text-white dark:bg-stone-900">
    <div class="grow overflow-y-auto relative lg:max-w-2xl">
      <slot/>
    </div>
  </div>
</template>

<script setup>
</script>