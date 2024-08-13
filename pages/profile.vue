<template>
  <div class="flex flex-col h-full gap-4 py-4 px-4 justify-between">
    <div class="flex flex-col gap-10">
      <IconButton class="ml-auto px-2" @click="signOut({ callbackUrl: '/login' })">
        <ArrowRightEndOnRectangleIcon class="w-8 h-8"/>
      </IconButton>

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
        <div class="rounded-xl bg-white dark:bg-stone-950 text-center grow p-2">
          <p class="text-2xl">{{ dreamCount }}</p>
          <p class="text-lg">Dreams</p>
        </div>
        <div class="rounded-xl bg-white dark:bg-stone-950 text-center grow p-2">
          <p class="text-2xl">{{ Number(avgTime! / 60).toFixed(1) }}h</p>
          <p class="text-lg">Ø Time</p>
        </div>
        <div class="rounded-xl bg-white dark:bg-stone-950 text-center grow p-2">
          <p class="text-2xl">{{ Number(avgQuality! * 20).toFixed(0) }}%</p>
          <p class="text-lg">Ø Quality</p>
        </div>
      </div>
    </div>


    <!-- Buttons -->
    <div class="flex flex-col grow gap-4 py-4">
      <LabelContainer label="User Settings">
        <NuxtLink class="flex flex-row gap-4 items-center py-4" to="/change/username">
          <AtSymbolIcon class="w-5 h-5"/>
          Change Username
        </NuxtLink>
        <NuxtLink class="flex flex-row gap-4 items-center py-4">
          <EnvelopeIcon class="w-5 h-5"/>
          <p>Change Email</p>
        </NuxtLink>
        <NuxtLink class="flex flex-row gap-4 items-center py-4">
          <KeyIcon class="w-5 h-5"/>
          <p>Change Password</p>
        </NuxtLink>
      </LabelContainer>

      <LabelContainer label="Theme">
        <button class="flex items-center justify-between pr-2 py-4"
                @click="$colorMode.preference = 'system'">
          <span class="flex items-center gap-4">
            <ComputerDesktopIcon class="w-5 h-5"/>
            System
          </span>
          <CheckIcon v-show="$colorMode.preference == 'system'" class="w-5 h-5"/>
        </button>
        <button class="flex items-center justify-between pr-2 py-4"
                @click="$colorMode.preference = 'dark'">
          <span class="flex items-center gap-4">
            <MoonIcon class="w-5 h-5"/>
            Dark
          </span>
          <CheckIcon v-show="$colorMode.preference == 'dark'" class="w-5 h-5"/>
        </button>
        <button class="flex items-center justify-between pr-2 py-4"
                @click="$colorMode.preference = 'light'">
          <span class="flex items-center gap-4">
            <SunIcon class="w-5 h-5"/>
            Light
          </span>
          <CheckIcon v-show="$colorMode.preference == 'light'" class="w-5 h-5"/>
        </button>
      </LabelContainer>

      <PrimaryButton class="border-red-600 text-red-600 bg-red-600 py-4">
        Delete Account
      </PrimaryButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {CheckIcon, UserIcon} from "@heroicons/vue/24/solid";
import {
  ArrowRightEndOnRectangleIcon,
  AtSymbolIcon,
  ComputerDesktopIcon,
  EnvelopeIcon,
  KeyIcon,
  MoonIcon,
  SunIcon
} from "@heroicons/vue/24/outline";

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