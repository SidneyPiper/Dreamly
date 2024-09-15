<template>
  <div
      class="flex flex-col-reverse items-stretch gap-y-8 lg:grid px-4 md:px-8 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-20 lg:px-16">
    <div
        class="hidden lg:flex lg:col-span-4 relative max-w-sm row-span-1">
      <Phone class="w-full">
        <img :src="searchScreenshot" alt="Screenshot of the apps search" class="mt-8">
      </Phone>
    </div>
    <div
        class="grid gap-y-12 gap-x-4 md:gap-x-8 grid-cols-[min-content,auto] md:grid-cols-[minmax(min-content, 1fr),auto] md:col-span-7 md:col-start-6 items-center">
      <h2 class="text-4xl font-medium tracking-tight col-span-full text-center">Features</h2>
      <div class="flex flex-row gap-4 items-start md:items-center justify-center md:justify-end h-full">
        <BookOutline class="w-8 h-8"/>
        <h2 class="text-2xl hidden md:block">Home</h2>
      </div>
      <div class="flex flex-col gap-1 cols-span-2 ">
        <h2 class="text-2xl md:hidden">Home</h2>
        <p class="text-lg col-span-2">Wander through your dreams, scrolling effortlessly to revisit or edit each
          entry.</p>
      </div>
      <div class="flex flex-row gap-4 items-start md:items-center justify-center h-full md:justify-end">
        <MagnifyingGlassOutline class="w-8 h-8"/>
        <h2 class="text-2xl hidden md:block">Search</h2>
      </div>
      <div class="flex flex-col gap-1 cols-span-2">
        <h2 class="text-2xl md:hidden">Search</h2>
        <p class="text-lg col-span-2">Dive into your dreamscape, searching for recurring themes or filtering by tags
          like lucid moments or hidden symbols.</p>
      </div>
      <div class="flex flex-row gap-4 items-start md:items-center justify-center h-full md:justify-end">
        <div class="flex items-center justify-center bg-stone-950 dark:bg-white rounded-md p-1">
          <PlusIcon class="w-6 h-6 stroke-white dark:stroke-stone-950"/>
        </div>
        <h2 class="text-2xl hidden md:block">Create</h2>
      </div>
      <div class="flex flex-col gap-1 cols-span-2">
        <h2 class="text-2xl md:hidden">Create</h2>
        <p class="text-lg col-span-2">Capture new dreams with a tap, adding tags to trace emotions or patterns as they
          unfold over time.</p>
      </div>
      <div class="flex flex-row gap-4 items-start md:items-center justify-center h-full md:justify-end">
        <CalendarOutline class="w-8 h-8"/>
        <h2 class="text-2xl hidden md:block">Calendar</h2>
      </div>
      <div class="flex flex-col gap-1 cols-span-2">
        <h2 class="text-2xl md:hidden">Calendar</h2>
        <p class="text-lg col-span-2">Follow the rhythm of your sleep, tracking its depth and quality while
          rediscovering the dreams woven into each night.</p>
      </div>
      <div class="flex flex-row gap-4 items-start md:items-center justify-center h-full md:justify-end">
        <UserOutline class="w-8 h-8"/>
        <h2 class="text-2xl hidden md:block">Profile</h2>
      </div>
      <div class="flex flex-col gap-1 cols-span-2">
        <h2 class="text-2xl md:hidden">Profile</h2>
        <p class="text-lg col-span-2">Personalize your space, from username to color theme, and explore the heart of the
          app’s features.</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  BookOpenIcon as BookOutline,
  CalendarDaysIcon as CalendarOutline,
  MagnifyingGlassIcon as MagnifyingGlassOutline,
  PlusIcon,
  UserIcon as UserOutline
} from '@heroicons/vue/24/outline';
import Phone from "~/components/static/Phone.vue";
import searchScreenshot from "~/assets/images/search-screenshot.png";
</script>