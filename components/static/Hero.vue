<template>
  <div class="pt-4 lg:pt-16">
    <div class="flex flex-col items-center gap-y-8 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-20 lg:px-16">
      <div
          class="lg:col-span-7">
        <h1 class="text-4xl font-medium tracking-tight">Welcome to Dreamly!</h1>
        <p class="text-lg">Dreamly is a gentle companion for capturing and exploring your dreams. Whether you're seeking
          the magic of lucid dreaming, uncovering hidden meanings, or simply reflecting on your subconscious, this app
          helps you dive into the mysteries of your inner world.</p>
      </div>
      <div
          class="w-full col-span-5 lg:col-span-4 lg:col-start-9 relative min-h-[16rem] lg:min-h-[24rem] max-w-sm row-span-1 [mask-image:linear-gradient(to_bottom,white_40%,transparent)]">
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
            <Dream class="!py-0" :dream="{
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
              }"/>
          </div>
        </Phone>
      </div>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-2 lg:px-16 lg:items-center py-32 gap-16">
      <div class="col-span-full flex flex-col items-center text-center">
        <h2 class="text-4xl font-medium tracking-tight">Why Keep a Dream Diary?</h2>
        <p class="text-lg max-w-lg">A dream diary is more than just a journal for dreams - it’s a tool for
          self-discovery. Here
          are some of the
          benefits.</p>
      </div>
      <div class="p-8 bg-stone-800 rounded-lg flex flex-col justify-center self-stretch">
        <h2 class="text-4xl font-medium tracking-tight">Enhanced Dream Recall</h2>
        <p class="text-lg max-w-lg">Regularly writing down your dreams helps you remember more details and increases
          dream awareness.</p>
      </div>
      <div class="p-8 bg-stone-800 rounded-lg flex flex-col justify-center self-stretch">
        <h2 class="text-4xl font-medium tracking-tight">Lucid Dreaming</h2>
        <p class="text-lg max-w-lg">A dream diary can aid in recognizing patterns in your dreams, making it easier to
          identify when you are dreaming and eventually take control of the dream.</p>
      </div>
      <div class="p-8 bg-stone-800 rounded-lg flex flex-col justify-center self-stretch">
        <h2 class="text-4xl font-medium tracking-tight">Self-Reflection</h2>
        <p class="text-lg max-w-lg">Dreams often reveal hidden thoughts and emotions. Recording them can lead to a
          deeper understanding of your subconscious.</p>
      </div>
      <div class="p-8 bg-stone-800 rounded-lg flex flex-col justify-center self-stretch">
        <h2 class="text-4xl font-medium tracking-tight">Improved Sleep Quality</h2>
        <p class="text-lg max-w-lg">Being mindful of your dream habits can help track your sleep patterns and promote
          better rest.</p>
      </div>
    </div>
    <div class="flex flex-col-reverse items-stretch gap-y-8 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-20 lg:px-16">
      <div
          class="flex lg:col-span-4 relative max-w-sm row-span-1">
        <Phone class="w-full">
          <div class="flex flex-col text-cloud w-full bg-stone-800 pt-12">
            <div class="px-4">
              <div class="flex flex-col items-stretch rounded-3xl mx-4 px-4 lg:mx-0 bg-white dark:bg-stone-950">
                <div class="flex items-stretch w-full">
                  <MagnifyingGlassIcon class="w-6 h-6 shrink-0 my-auto"/>
                  <input class="bg-transparent border-none focus:ring-0 text-xl grow shrink min-w-0"
                         placeholder="Search..." disabled>
                  <IconButton class="flex items-center justify-center shrink-0 pl-3">
                    <FunnelIcon class="w-6 h-6 stroke-[1.5px] stroke-stone-950 dark:stroke-white"/>
                  </IconButton>
                </div>
              </div>
            </div>
            <Dream class="!py-3 !px-4" :dream="{
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
            <div class="w-full border-2 border-black"></div>
            <Dream class="!py-3 !px-4" :dream="{
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
              }"/>
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
    <div class="grid grid-cols-1 lg:grid-cols-2 lg:px-16 lg:items-center py-32 gap-y-32">
      <div class="col-span-full flex flex-col items-center text-center gap-4">
        <h2 class="text-4xl font-medium tracking-tight">Meet the Developers</h2>
        <p class="text-lg max-w-lg">Dreamly was created by a development duo with a shared fascination for dreams. They
          collaborated closely on every aspect of the app, from its design to its inner workings.</p>
        <p class="text-xl max-w-lg">Together, they believe <span class="font-extrabold">the better we understand our dreams, the better we understand ourselves</span>,
          and Dreamly was built with this philosophy in mind.</p>
      </div>
      <div class="flex flex-col items-center gap-6">
        <UserIcon class="w-24 h-24"/>
        <div class="flex flex-col gap-4 text-center">
          <p class="text-3xl">Sidney Piper</p>
          <p class="text-lg">CEO</p>
        </div>
      </div>
      <div class="flex flex-col items-center gap-6">
        <UserIcon class="w-24 h-24"/>
        <div class="flex flex-col gap-4 text-center">
          <p class="text-3xl">John Wagner</p>
          <p class="text-lg">CEO</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Phone from "~/components/static/Phone.vue";
import {DateTime} from "luxon";
import {
  BookOpenIcon as BookOutline,
  CalendarDaysIcon as CalendarOutline, FunnelIcon, MagnifyingGlassIcon,
  MagnifyingGlassIcon as MagnifyingGlassOutline,
  PlusIcon,
  UserIcon as UserOutline
} from '@heroicons/vue/24/outline';
import type {TagDropdown} from "#components";
import {UserIcon} from "@heroicons/vue/24/solid";
</script>