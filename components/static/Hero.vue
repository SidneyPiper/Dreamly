<template>
  <div class="flex flex-col items-center gap-y-8 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-20 lg:px-16">
    <div class="flex flex-col gap-4 lg:col-span-7">
      <h1 class="text-4xl font-medium tracking-tight">Welcome to Dreamly!</h1>
      <p class="text-lg">Dreamly is a gentle companion for capturing and exploring your dreams. Whether you're seeking
        the magic of lucid dreaming, uncovering hidden meanings, or simply reflecting on your subconscious, this app
        helps you dive into the mysteries of your inner world.</p>
    </div>
    <div
        class="w-full col-span-5 lg:col-span-4 lg:col-start-9 relative min-h-[16rem] lg:min-h-[18rem] max-w-sm row-span-1 [mask-image:linear-gradient(to_bottom,white_40%,transparent)]">
      <Phone class="!absolute w-full">
        <div class="flex flex-col text-cloud p-4 h-full w-full bg-stone-800">
          <Dream :dream="{
                  id: '1',
                  title: 'The Forest',
                  content: 'I found myself walking through a lush, green forest filled with twinkling lights and whispering trees. As I ventured deeper, I encountered magical creatures who guided me to a hidden waterfall that glowed with a soft, ethereal light.',
                  date: DateTime.now().set({day: 4, month: 3}).toJSDate(),
                  tags: [{
                    id: '1',
                    label: 'Fantasy',
                    color: { id: '1', hex: '#FDE4CF'}
                  },
                  {
                    id: '1',
                    label: 'Exploration',
                    color: { id: '1', hex: '#FFCFD2'}
                  }]
              }"/>
          <Dream :dream="{
                  id: '1',
                  title: 'The Enchanted Forest',
                  content: 'I found myself walking through a lush, green forest filled with twinkling lights and whispering trees. As I ventured deeper, I encountered magical creatures who guided me to a hidden waterfall that glowed with a soft, ethereal light.',
                  date: DateTime.now().set({day: 19, month: 9}).toJSDate(),
                  tags: [{
                    id: '1',
                    label: 'Fantasy',
                    color: { id: '1', hex: '#FDE4CF'}
                  },
                  {
                    id: '1',
                    label: 'Exploration',
                    color: { id: '1', hex: '#FFCFD2'}
                  }]
              }" class="!py-0"/>
        </div>
      </Phone>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Phone from "~/components/static/Phone.vue";
import {DateTime} from "luxon";
</script>