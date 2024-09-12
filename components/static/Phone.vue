<template>
  <div class="relative aspect-[448/912] max-w-[448]">
    <div
        class="absolute left-[calc(20/448*100%)] top-[calc(16/912*100%)] grid h-[calc(880/912*100%)] w-[calc(409/448*100%)] transform grid-cols-1 overflow-hidden bg-gray-900">
      <slot/>
    </div>
    <img :src="Phone" alt="" class="absolute w-full hg">
  </div>
</template>

<script lang="ts" setup>
import Phone from "assets/images/phone.svg"
</script>