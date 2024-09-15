<template>
  <div class="flex flex-col font-sans text-stone-950 h-dvh bg-cloud dark:text-white dark:bg-stone-900 overflow-y-auto"
       data-scrollable="wrapper">
    <slot/>
  </div>
  <div class="fixed top-0 left-0 text-cloud">
    <p class="sm:hidden">XS</p>
    <p class="hidden sm:block md:hidden">SM</p>
    <p class="hidden md:block lg:hidden">MD</p>
    <p class="hidden lg:block xl:hidden">LG</p>
    <p class="hidden xl:block 2xl:hidden">XL</p>
    <p class="hidden 2xl:block">2XL</p>
  </div>
</template>

<script setup>

</script>