<template>
  <div class="flex flex-col xl:flex-row items-center justify-between px-2 md:px-4 lg:px-16 gap-16">
    <div class="col-span-full flex flex-col text-center xl:text-left gap-4">
      <h2 class="text-4xl font-medium tracking-tight">Meet the developers</h2>
      <p class="text-lg max-w-xl">Dreamly was created by a development duo with a shared fascination for dreams. They
        collaborated closely on every aspect of the app, from its design to its inner workings.</p>
      <p class="text-xl max-w-xl">Together, they believe <span class="font-extrabold">the better we understand our dreams, the better we understand ourselves</span>,
        and Dreamly was built with this philosophy in mind.</p>
    </div>
    <div class="flex flex-col sm:flex-row justify-evenly gap-20 w-full xl:w-auto">
      <div class="flex flex-row sm:flex-col items-center justify-center gap-6">
        <img :src="imgSidney" alt="Image of John" class="w-32 sm:w-48 aspect-square rounded-full saturate-150"/>
        <div class="flex flex-col gap-1 text-center">
          <p class="text-3xl">Sidney Piper</p>
          <a class="font-mono text-lg text-center hover:underline" href="https://saltyyy.dev">
            saltyyy.dev
          </a>
        </div>
      </div>
      <div class="flex flex-row sm:flex-col items-center justify-center gap-6">
        <img :src="imgJohn" alt="Image of John" class="w-32 sm:w-48 aspect-square rounded-full"/>
        <div class="flex flex-col gap-1 text-center">
          <p class="text-3xl">John Wagner</p>
          <a class="font-mono text-lg text-center hover:underline" href="https://techbra.in">
            techbra.in
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import imgJohn from "~/assets/images/john.jpg";
import imgSidney from "~/assets/images/sidney.jpg";
</script>