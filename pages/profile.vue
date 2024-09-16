<template>
  <div class="flex flex-col gap-4 py-4 px-4 justify-between">
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
        <StatWidget :value="dreamCount" title="Dreams"/>
        <StatWidget :value="Number(avgTime! / 60).toFixed(1)" title="Ø Time"/>
        <StatWidget :value="Number(avgQuality! * 20).toFixed(0)" title="Ø Quality"/>
      </div>
    </div>

    <!-- User Settings -->
    <LabelContainer label="User Settings">
      <IconButton to="/change/username">
        <AtSymbolIcon class="w-5 h-5"/>
        Change Username
      </IconButton>
      <!-- @vue-ignore -->
      <IconButton v-if="!data?.user?.oauth" to="/change/email">
        <EnvelopeIcon class="w-5 h-5"/>
        Change Email
      </IconButton>
      <!-- @vue-ignore -->
      <IconButton v-if="!data?.user?.oauth" to="/change/password">
        <KeyIcon class="w-5 h-5"/>
        Change Password
      </IconButton>
    </LabelContainer>

    <!-- Theme -->
    <LabelContainer label="Theme">
      <IconButton :selected="$colorMode.preference == 'system'"
                  class="flex items-center justify-between pr-2 py-4"
                  @click="$colorMode.preference = 'system'; handleStatusBar()">
        <ComputerDesktopIcon class="w-5 h-5"/>
        System
      </IconButton>
      <IconButton :selected="$colorMode.preference == 'dark'" class="flex items-center justify-between pr-2 py-4"
                  @click="$colorMode.preference = 'dark'; handleStatusBar()">
        <MoonIcon class="w-5 h-5"/>
        Dark
      </IconButton>
      <IconButton :selected="$colorMode.preference == 'light'" class="flex items-center justify-between pr-2 py-4"
                  @click="$colorMode.preference = 'light'; handleStatusBar()">
        <SunIcon class="w-5 h-5"/>
        Light
      </IconButton>
    </LabelContainer>

    <LabelContainer label="Information">
      <IconButton to="/about">
        <IdentificationIcon class="w-5 h-5"/>
        About
      </IconButton>
      <IconButton to="/guide">
        <LifebuoyIcon class="w-5 h-5"/>
        Guide
      </IconButton>
      <IconButton to="/privacy">
        <ScaleIcon class="w-5 h-5"/>
        Privacy
      </IconButton>
      <IconButton to="/donate">
        <BanknotesIcon class="w-5 h-5"/>
        Donate
      </IconButton>
      <IconButton @click="downloadJson">
        <FolderArrowDownIcon class="w-5 h-5"/>
        Export data
      </IconButton>
    </LabelContainer>

    <PrimaryButton class="border-red-600 text-red-600 bg-red-600 py-4 rounded-xl">
      Delete Account
    </PrimaryButton>
  </div>
</template>

<script lang="ts" setup>
import {UserIcon} from "@heroicons/vue/24/solid";
import {
  ArrowRightEndOnRectangleIcon,
  AtSymbolIcon,
  BanknotesIcon,
  ComputerDesktopIcon,
  EnvelopeIcon,
  IdentificationIcon,
  KeyIcon,
  LifebuoyIcon,
  MoonIcon,
  SunIcon,
  FolderArrowDownIcon,
  ScaleIcon
} from "@heroicons/vue/24/outline";
import StatWidget from "~/components/StatWidget.vue";
import {useNotificationsStore} from "stores/notifications";
import {setPageScrollPositions} from "stores/scroll";

definePageMeta({
  middleware: 'auth',
  preserveScroll: true
})

onBeforeRouteLeave((to, from, next) => {
  if (from.meta.preserveScroll) {
    const windowScroll = window.scrollY
    const containerScroll: { [key: string]: number } = {}

    document.querySelectorAll('[data-scrollable]').forEach((c) => {
      if (c.hasAttribute('data-scrollable'))
        containerScroll[c.getAttribute('data-scrollable')!] = c.scrollTop;
    })

    setPageScrollPositions(from.fullPath, {
      window: windowScroll,
      containers: containerScroll,
    })
  }
  next()
})

const {data, signOut} = useAuth()
const {notify} = useNotificationsStore()
const dreamCount = ref<number>(0)
const avgTime = ref<number>(0)
const avgQuality = ref<number>(0)

onBeforeMount(() => {
  fetchStats()
})

async function fetchStats() {
  await $fetch('/api/dreams/count')
      .then(async (response) => {
        dreamCount.value = response
      })
  await $fetch('/api/tracker/avg/sleep')
      .then(async (response) => {
        avgTime.value = response
      })
  await $fetch('/api/tracker/avg/quality')
      .then(async (response) => {
        avgQuality.value = response
      })
}

async function downloadJson() {
  await $fetch('/api/export', {
    method: 'GET',
  }).then(async (response) => {
    // Create a blob from the JSON data
    const blob = new Blob([JSON.stringify(response, null, 2)], {type: 'application/json'});

    // Create a download link element
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'dreams.json';

    // Trigger the download by programmatically clicking the link
    link.click();

    // Cleanup the object URL
    URL.revokeObjectURL(link.href);
  }).catch((response) => {
    notify(Level.DANGER, response.data.statusMessage)
    return response
  })
}

const handleStatusBar = () => {
  const color_mode = useColorMode()
  const meta = document.querySelector("meta[name='theme-color']")

  nextTick(() => {
    if (color_mode.value == 'dark') {
      meta?.setAttribute('content', '#1c1917')
    } else {
      meta?.setAttribute('content', '#e5e8db')
    }
  })
}
</script>