<template>
  <div class="flex flex-col h-full relative">
    <div class="flex items-center justify-between p-4">
      <TextButton class="flex items-center gap-2 font-semibold text-xl" @click="$router.back">
        <ChevronLeftIcon class="w-6 h-6"/>
        Back
      </TextButton>
    </div>

    <Fader class="grow text-cloud dark:text-stone-900" vertical>
      <div class="h-full overflow-y-auto text-black dark:text-white px-4 pb-4 flex flex-col gap-6">
        <LabeledText label="Using Dreamly: A Quick Guide">
          <p>Dreamly is designed to be easy and intuitive.</p>
        </LabeledText>
        <div class="space-y-1">
          <div class="flex flex-row gap-2 items-center">
            <h2 class="text-xl font-bold">Home Page</h2>
            <BookOutline class="w-6 h-6"/>
          </div>
          <p>This is where you'll find your dreams displayed in chronological order. You can scroll through past
            entries,
            view recent dreams, and easily tap on any entry to read or edit it.</p>
        </div>
        <div class="space-y-1">
          <div class="flex flex-row gap-2 items-center">
            <h2 class="text-xl font-bold">Search & Filter</h2>
            <MagnifyingGlassOutline class="w-6 h-6"/>
          </div>
          <p>Use the Search function to quickly find a specific dream or explore recurring themes. You can also filter
            dreams by tags, making it easier to analyze patterns or revisit specific types of dreams (e.g., nightmares,
            lucid dreams, recurring symbols).</p>
        </div>
        <div class="space-y-1">
          <div class="flex flex-row gap-2 items-center">
            <h2 class="text-xl font-bold">Create New Dreams</h2>
            <div class="flex items-center justify-center bg-stone-950 dark:bg-white rounded-md p-1">
              <PlusIcon class="w-4 h-4 stroke-white dark:stroke-stone-950"/>
            </div>
          </div>
          <p>The Create button allows you to write down new dreams. You can also label your dreams with tags (or create
            new
            tags) to categorize them. This makes it easy to track themes or emotions over time. Each entry includes the
            date, a description, and any relevant tags.</p>
        </div>
        <div class="space-y-1">
          <div class="flex flex-row gap-2 items-center">
            <h2 class="text-xl font-bold">Calendar View</h2>
            <CalendarOutline class="w-6 h-6"/>
          </div>
          <p>The Calendar feature lets you track your sleep duration and quality. You can view how long you slept and
            rate
            the quality of your sleep on specific days. This view also allows you to revisit the dreams you logged on
            those
            days for deeper analysis.</p>
        </div>
        <div class="space-y-1">
          <div class="flex flex-row gap-2 items-center">
            <h2 class="text-xl font-bold">Profile & Settings</h2>
            <UserOutline class="w-6 h-6"/>
          </div>
          <p>In the Profile tab, you can change your user settings, such as your username or password, and customize the
            app’s color theme to suit your preferences. You can also view additional information about the app and its
            features.</p>
        </div>
      </div>
    </Fader>


  </div>
</template>

<script setup lang="ts">
import {
  BookOpenIcon as BookOutline,
  CalendarDaysIcon as CalendarOutline,
  MagnifyingGlassIcon as MagnifyingGlassOutline,
  PlusIcon,
  UserIcon as UserOutline
} from '@heroicons/vue/24/outline';
import {ChevronLeftIcon} from "@heroicons/vue/24/solid";

definePageMeta({
  middleware: 'auth',
})
</script>