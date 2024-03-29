<template>
    <div class="flex bg-white dark:bg-stone-950 stroke-stone-950 dark:stroke-white">
        <NuxtLink to="/home" class="grow py-10 flex items-center justify-center relative">
            <Transition>
                <BookSolid v-if="isActive('/home')" class="w-8 h-8 absolute" />
                <BookOutline v-else class="w-8 h-8 absolute" />
            </Transition>
        </NuxtLink>
        <NuxtLink to="/calendar" class="grow py-10 flex items-center justify-center relative">
            <Transition>
                <CalendarSolid v-if="isActive('/calendar')" class="w-8 h-8 absolute" />
                <CalendarOutline v-else class="w-8 h-8 absolute" />
            </Transition>
        </NuxtLink>
        <NuxtLink to="/profile" class="grow py-10 flex items-center justify-center relative">
            <Transition>
                <UserSolid v-if="isActive('/profile')" class="w-8 h-8 absolute" />
                <UserOutline v-else class="w-8 h-8 absolute" />
            </Transition>
        </NuxtLink>
    </div>
</template>

<script setup lang="ts">
import { BookOpenIcon as BookOutline } from '@heroicons/vue/24/outline';
import { BookOpenIcon as BookSolid } from '@heroicons/vue/24/solid';
import { CalendarDaysIcon as CalendarOutline } from '@heroicons/vue/24/outline';
import { CalendarDaysIcon as CalendarSolid } from '@heroicons/vue/24/solid';
import { UserIcon as UserOutline } from '@heroicons/vue/24/outline';
import { UserIcon as UserSolid } from '@heroicons/vue/24/solid';

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