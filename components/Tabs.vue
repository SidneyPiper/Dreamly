<template>
  <div class="flex bg-white dark:bg-stone-950 stroke-stone-950 dark:stroke-white">
    <NuxtLink class="grow py-10 flex items-center justify-center relative" to="/home">
      <Transition>
        <BookSolid v-if="isActive('/home')" class="w-8 h-8 absolute"/>
        <BookOutline v-else class="w-8 h-8 absolute"/>
      </Transition>
    </NuxtLink>
    <NuxtLink class="grow py-10 flex items-center justify-center relative" to="/search">
      <Transition>
        <MagnifyingGlassSolid v-if="isActive('/search')" class="w-8 h-8 absolute"/>
        <MagnifyingGlassOutline v-else class="w-8 h-8 absolute"/>
      </Transition>
    </NuxtLink>
    <NuxtLink class="grow py-10 flex items-center justify-center relative" to="/dream">
      <div class="flex absolute items-center justify-center bg-stone-950 dark:bg-white rounded-lg p-1">
        <PlusIcon class="w-8 h-8 stroke-white dark:stroke-stone-950"/>
      </div>
    </NuxtLink>
    <NuxtLink class="grow py-10 flex items-center justify-center relative" to="/calendar">
      <Transition>
        <CalendarSolid v-if="isActive('/calendar')" class="w-8 h-8 absolute"/>
        <CalendarOutline v-else class="w-8 h-8 absolute"/>
      </Transition>
    </NuxtLink>
    <NuxtLink class="grow py-10 flex items-center justify-center relative" to="/profile">
      <Transition>
        <UserSolid v-if="isActive('/profile')" class="w-8 h-8 absolute"/>
        <UserOutline v-else class="w-8 h-8 absolute"/>
      </Transition>
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