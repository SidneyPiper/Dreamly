<template>
  <div class="flex flex-col h-full gap-4 py-4 px-4 justify-between">
    <div class="flex flex-col gap-10 py-10">
      <!-- Profile Picture and Name/Email -->
      <div class="flex flex-col items-center gap-6">
        <UserIcon class="w-24 h-24"/>
        <div class="text-center">
          <p class="text-3xl">{{ data?.user?.name }}</p>
          <p class="text-lg">{{ data?.user?.email }}</p>
        </div>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-3 gap-4">
        <div class="rounded-xl bg-stone-950 text-center grow p-2">
          <p class="text-2xl">{{ dreamCount }}</p>
          <p class="text-lg">Dreams</p>
        </div>
        <div class="rounded-xl bg-stone-950 text-center grow p-2">
          <p class="text-2xl">{{ Number(avgTime! / 60).toFixed(1) }}h</p>
          <p class="text-lg">Ø Time</p>
        </div>
        <div class="rounded-xl bg-stone-950 text-center grow p-2">
          <p class="text-2xl">{{ Number(avgQuality! * 20).toFixed(0) }}%</p>
          <p class="text-lg">Ø Quality</p>
        </div>
      </div>
    </div>


    <!-- Buttons -->
    <div class="flex flex-col grow">
      <NuxtLink class="border-t-2 border-stone-950 p-4 text-lg">Change Username</NuxtLink>
      <NuxtLink class="border-t-2 border-stone-950 p-4 text-lg">Change Email</NuxtLink>
      <NuxtLink class="border-t-2 border-stone-950 p-4 text-lg">Change Password</NuxtLink>
      <NuxtLink class="border-t-2 border-stone-950 p-4 text-lg">Select Theme</NuxtLink>
      <NuxtLink class="border-t-2 border-b-2 border-stone-950 p-4 text-lg">Delete Account</NuxtLink>
    </div>

    <SecondaryButton class="justify-center py-2" @click="signOut({ callbackUrl: '/login' })">
      Logout
    </SecondaryButton>
  </div>
</template>

<script lang="ts" setup>
import {ChevronDownIcon, EnvelopeIcon, PhotoIcon, UserIcon} from "@heroicons/vue/24/solid";
import {DateTime} from "luxon";

definePageMeta({
  middleware: 'auth',
  layout: 'default',
  pageTransition: {name: 'fade-page'},
  layoutTransition: {name: 'stay'}
})

const {data, signOut} = useAuth()

const headers = useRequestHeaders(['cookie'])

const {data: dreamCount} = await useFetch('/api/dreams/count', {headers})
const {data: avgTime} = await useFetch('/api/tracker/avg/sleep', {headers})
const {data: avgQuality} = await useFetch('/api/tracker/avg/quality', {headers})
</script>