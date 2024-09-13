<template>
  <div
      class="flex flex-col-reverse items-stretch gap-y-8 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-20 lg:px-16">
    <div
        class="hidden lg:flex lg:col-span-4 relative max-w-sm row-span-1">
      <Phone class="w-full">
        <div class="flex flex-col text-cloud w-full bg-stone-800 pt-12">
          <div class="px-4">
            <div class="flex flex-col items-stretch rounded-3xl mx-4 px-4 lg:mx-0 bg-white dark:bg-stone-950">
              <div class="flex items-stretch w-full">
                <MagnifyingGlassIcon class="w-6 h-6 shrink-0 my-auto"/>
                <input class="bg-transparent border-none focus:ring-0 text-xl grow shrink min-w-0"
                       disabled placeholder="Search...">
                <IconButton class="flex items-center justify-center shrink-0 pl-3">
                  <FunnelIcon class="w-6 h-6 stroke-[1.5px] stroke-stone-950 dark:stroke-white"/>
                </IconButton>
              </div>
            </div>
          </div>
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
              }" class="!py-3 !px-4"/>
          <div class="w-full border-2 border-black"></div>
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
              }" class="!py-3 !px-4"/>
          <div class="w-full border-2 border-black"></div>
          <div class="flex justify-around bg-stone-950 py-4 pb-6 absolute bottom-0 w-full">
            <BookOutline class="w-7 h-7"/>
            <MagnifyingGlassOutline class="w-7 h-7 stroke-[3] text-white"/>
            <div class="flex items-center justify-center bg-stone-950 dark:bg-white rounded-md p-1 aspect-square">
              <PlusIcon class="w-5 h-5 stroke-white dark:stroke-stone-950"/>
            </div>
            <CalendarOutline class="w-7 h-7"/>
            <UserOutline class="w-7 h-7"/>
          </div>
        </div>
      </Phone>
    </div>
    <div
        class="flex flex-col col-start-6 col-span-7 lg:grid lg:grid-cols-3 items-center">
      <h2 class="text-4xl font-medium tracking-tight col-span-full text-center">Features</h2>
      <div class="flex flex-row gap-4 items-center">
        <BookOutline class="w-8 h-8"/>
        <h2 class="text-2xl">Home</h2>
      </div>
      <p class="text-lg col-span-2">Wander through your dreams, scrolling effortlessly to revisit or edit each
        entry.</p>
      <div class="flex flex-row gap-4 items-center">
        <MagnifyingGlassOutline class="w-8 h-8"/>
        <h2 class="text-2xl">Search</h2>
      </div>
      <p class="text-lg col-span-2">Dive into your dreamscape, searching for recurring themes or filtering by tags
        like lucid moments or hidden symbols.</p>
      <div class="flex flex-row gap-4 items-center">
        <div class="flex items-center justify-center bg-stone-950 dark:bg-white rounded-md p-1">
          <PlusIcon class="w-6 h-6 stroke-white dark:stroke-stone-950"/>
        </div>
        <h2 class="text-2xl">Create</h2>
      </div>
      <p class="text-lg col-span-2">Capture new dreams with a tap, adding tags to trace emotions or patterns as they
        unfold over time.</p>
      <div class="flex flex-row gap-4 items-center">
        <CalendarOutline class="w-8 h-8"/>
        <h2 class="text-2xl">Calendar</h2>
      </div>
      <p class="text-lg col-span-2">Follow the rhythm of your sleep, tracking its depth and quality while
        rediscovering the dreams woven into each night.</p>
      <div class="flex flex-row gap-4 items-center">
        <UserOutline class="w-8 h-8"/>
        <h2 class="text-2xl">Profile</h2>
      </div>
      <p class="text-lg col-span-2">Personalize your space, from username to color theme, and explore the heart of the
        app’s features.</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  BookOpenIcon as BookOutline,
  CalendarDaysIcon as CalendarOutline,
  FunnelIcon,
  MagnifyingGlassIcon as MagnifyingGlassOutline,
  MagnifyingGlassIcon,
  PlusIcon,
  UserIcon as UserOutline
} from '@heroicons/vue/24/outline';
import {DateTime} from "luxon";
import Phone from "~/components/static/Phone.vue";
</script>