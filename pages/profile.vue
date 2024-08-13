<template>
  <div class="flex flex-col h-full gap-4 py-4 px-4 justify-between">
    <div class="flex flex-col gap-10">
      <IconButton @click="signOut({ callbackUrl: '/login' })" class="ml-auto px-2">
        <ArrowRightEndOnRectangleIcon class="w-8 h-8"/>
      </IconButton>

      <!-- Profile Picture and Name/Email -->
      <div class="flex flex-col items-center gap-6">
        <UserIcon class="w-24 h-24"/>
        <div class="text-center">
          <p class="text-3xl">{{ data?.user?.name }}</p>
          <p class="text-lg">{{ data?.user?.email }}</p>
          <p class="text-lg">{{ colorMode.preference }}</p>
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
    <div class="flex flex-col grow gap-4 py-4">
      <div class="flex flex-col bg-stone-950 px-4 pt-4 rounded-xl">
        <div class="text-xl font-bold">User Settings</div>
        <NuxtLink class="flex flex-row gap-4 items-center border-b py-4 border-stone-800">
          <AtSymbolIcon class="w-5 h-5"/>
          <p>Change Username</p>
        </NuxtLink>
        <NuxtLink class="flex flex-row gap-4 items-center border-b py-4 border-stone-800">
          <EnvelopeIcon class="w-5 h-5"/>
          <p>Change Email</p>
        </NuxtLink>
        <NuxtLink class="flex flex-row gap-4 items-center py-4">
          <KeyIcon class="w-5 h-5"/>
          <p>Change Password</p>
        </NuxtLink>
      </div>

      <div class="flex flex-col bg-stone-950 px-4 pt-4 rounded-xl">
        <div class="text-xl font-bold">Theme</div>
        <button class="flex flex-row items-center justify-between pr-4 border-b py-4 border-stone-800"
                @click="$colorMode.preference = 'system'">
          <NuxtLink>System</NuxtLink>
          <CheckIcon v-if="$colorMode.preference == 'system'" class="w-5 h-5"/>
        </button>
        <button class="flex flex-row items-center justify-between pr-4 border-b py-4 border-stone-800"
                @click="$colorMode.preference = 'dark'">
          <NuxtLink>Dark</NuxtLink>
          <CheckIcon v-if="$colorMode.preference == 'dark'" class="w-5 h-5"/>
        </button>
        <button class="flex flex-row items-center justify-between pr-4 border-b py-4 border-stone-800"
                @click="$colorMode.preference = 'light'">
          <NuxtLink>Light</NuxtLink>
          <CheckIcon v-if="$colorMode.preference == 'light'" class="w-5 h-5"/>
        </button>
      </div>

      <SecondaryButton class="border-red-600 text-red-600 py-4">
        Delete Account
      </SecondaryButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {CheckIcon, UserIcon} from "@heroicons/vue/24/solid";
import {AtSymbolIcon, EnvelopeIcon, KeyIcon, ArrowRightEndOnRectangleIcon} from "@heroicons/vue/24/outline";
import locally from "~/plugins/locally";

definePageMeta({
  middleware: 'auth',
  layout: 'default',
  pageTransition: {name: 'fade-page'},
  layoutTransition: {name: 'stay'}
})

const colorMode = useColorMode()

const {data, signOut} = useAuth()

const headers = useRequestHeaders(['cookie'])

const {data: dreamCount} = await useFetch('/api/dreams/count', {headers})
const {data: avgTime} = await useFetch('/api/tracker/avg/sleep', {headers})
const {data: avgQuality} = await useFetch('/api/tracker/avg/quality', {headers})

</script>