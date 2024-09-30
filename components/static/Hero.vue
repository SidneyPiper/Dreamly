<template>
  <div class="flex flex-col items-center gap-y-8 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-20 lg:px-16">
    <div class="flex flex-col gap-4 lg:col-span-7">
      <h1 class="text-4xl font-medium tracking-tight">Welcome to Dreamly!</h1>
      <p class="text-lg">Dreamly is a gentle companion for capturing and exploring your dreams. Whether you're seeking
        the magic of lucid dreaming, uncovering hidden meanings, or simply reflecting on your subconscious, this app
        helps you dive into the mysteries of your inner world.</p>
      <PrimaryButton v-show="showButton" class="max-w-min whitespace-nowrap font-semibold"
                     @click="() => installPrompt()">
        Install now
      </PrimaryButton>
    </div>
    <div
        class="w-full col-span-5 lg:col-span-4 lg:col-start-9 relative min-h-[16rem] lg:min-h-[18rem] max-w-sm row-span-1 [mask-image:linear-gradient(to_bottom,white_40%,transparent)]">
      <Phone class="!absolute w-full">
        <img :src="startScreenshot" alt="Screenshot of the apps search" class="mt-8">
      </Phone>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Phone from "~/components/static/Phone.vue"

import startScreenshot from "~/assets/images/start-screenshot.png"

const showButton = ref<boolean>(false)
const installPrompt = ref<any>(null)

if (import.meta.client) {
  window.addEventListener('beforeinstallprompt', e => {
    installPrompt.value = e
    showButton.value = true
  })
}
</script>