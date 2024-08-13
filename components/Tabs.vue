<template>
  <div
      class="flex lg:flex-col lg:mt-8 bg-white dark:bg-stone-950 lg:bg-transparent dark:lg:bg-transparent stroke-stone-950 dark:stroke-white">
    <NuxtLink class="grow py-8 lg:py-4 flex items-center justify-center lg:justify-start gap-4 relative" to="/home">
      <span class="w-8 h-8">
        <Transition>
          <BookSolid v-if="isActive('/home')" class="w-8 h-8 absolute stroke-0"/>
          <BookOutline v-else class="w-8 h-8 absolute"/>
        </Transition>
      </span>
      <p class="hidden lg:block text-lg font-semibold">Home</p>
    </NuxtLink>
    <NuxtLink class="grow py-8 lg:py-4 flex items-center justify-center lg:justify-start gap-4 relative" to="/search">
      <span class="w-8 h-8">
        <Transition>
          <MagnifyingGlassSolid v-if="isActive('/search')" class="w-8 h-8 absolute"/>
          <MagnifyingGlassOutline v-else class="w-8 h-8 absolute"/>
        </Transition>
      </span>
      <p class="hidden lg:block text-lg font-semibold">Search</p>
    </NuxtLink>
    <NuxtLink class="grow py-8 flex lg:hidden items-center justify-center relative" to="/dream">
      <div class="flex absolute items-center justify-center bg-stone-950 dark:bg-white rounded-lg p-1">
        <PlusIcon class="w-8 h-8 stroke-white dark:stroke-stone-950"/>
      </div>
    </NuxtLink>
    <NuxtLink class="grow py-8 lg:py-4 flex items-center justify-center lg:justify-start gap-4 relative"
              to="/calendar">
      <span class="w-8 h-8">
        <Transition>
          <CalendarSolid v-if="isActive('/calendar')" class="w-8 h-8 absolute stroke-0"/>
          <CalendarOutline v-else class="w-8 h-8 absolute"/>
        </Transition>
      </span>
      <p class="hidden lg:block text-lg font-semibold">Calendar</p>
    </NuxtLink>
    <NuxtLink class="grow py-8 lg:py-4 flex items-center justify-center lg:justify-start gap-4 relative" to="/profile">
      <span class="w-8 h-8">
        <Transition>
          <UserSolid v-if="isActive('/profile')" class="w-8 h-8 absolute stroke-0"/>
          <UserOutline v-else class="w-8 h-8 absolute"/>
        </Transition>
      </span>
      <p class="hidden lg:block text-lg font-semibold">Profile</p>
    </NuxtLink>
    <NuxtLink
        class="hidden grow lg:py-2 lg:mt-4 lg:flex items-center justify-center relative bg-stone-950 dark:bg-white text-white dark:text-stone-950 rounded-full"
        to="/dream">
      <p class="hidden lg:block text-lg font-semibold">Create</p>
    </NuxtLink>
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
import {
  BookOpenIcon as BookSolid,
  CalendarDaysIcon as CalendarSolid,
  MagnifyingGlassIcon as MagnifyingGlassSolid,
  UserIcon as UserSolid
} from '@heroicons/vue/24/solid';

function isActive(route: string): boolean {
  return useRoute().path == route
}
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>