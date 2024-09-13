<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 lg:px-16 lg:items-center gap-y-24">
    <div class="col-span-full flex flex-col items-center text-center gap-4">
      <h2 class="text-4xl font-medium tracking-tight">Meet the developers</h2>
      <p class="text-lg max-w-xl">Dreamly was created by a development duo with a shared fascination for dreams. They
        collaborated closely on every aspect of the app, from its design to its inner workings.</p>
      <p class="text-xl max-w-xl">Together, they believe <span class="font-extrabold">the better we understand our dreams, the better we understand ourselves</span>,
        and Dreamly was built with this philosophy in mind.</p>
    </div>
    <div class="flex flex-col items-center gap-6">
      <img :src="imgSidney" alt="Image of John" class="w-48 h-48 rounded-full saturate-150"/>
      <div class="flex flex-col gap-1 text-center">
        <p class="text-3xl">Sidney Piper</p>
        <p class="text-lg">Fullstack</p>
      </div>
    </div>
    <div class="flex flex-col items-center gap-6">
      <img :src="imgJohn" alt="Image of John" class="w-48 h-48 rounded-full"/>
      <div class="flex flex-col gap-1 text-center">
        <p class="text-3xl">John Wagner</p>
        <p class="text-lg">Fullstack</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import imgJohn from "~/assets/images/john.jpg";
import imgSidney from "~/assets/images/sidney.jpg";
</script>