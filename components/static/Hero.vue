<template>
  <div class="overflow-hidden py-20 sm:py-32 lg:pb-32 xl:pb-36">
    <Wrapper>
      <div class="lg:grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-20 border-2 border-red-500">
        <div
            class="flex flex-col relative z-10 mx-auto max-w-2xl lg:col-span-7 lg:max-w-none lg:py-8 xl:col-span-6">
          <h1 class="text-4xl font-medium tracking-tight">Track everything dreamly.</h1>
          <p class="mt-6 text-lg">By leveraging our suite of scientific tools around dream diary, sleep
            quality and duration trackers, and efficient search functionality, you can finally be the king of your
            dreams instead of the vassal.</p>
        </div>
        <div class="col-span-4 col-start-8 relative row-span-1">
          <Phone class="!absolute w-full">
            <div class="flex justify-center text-black p-16 bg-white h-full w-full">
              Some content
            </div>
          </Phone>
        </div>
      </div>
    </Wrapper>
  </div>
</template>

<script lang="ts" setup>
import Wrapper from "~/components/static/Wrapper.vue";
import Phone from "~/components/static/Phone.vue";
</script>