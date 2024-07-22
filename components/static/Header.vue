<template>
  <Wrapper>
    <div
        class="flex items-center justify-between py-6">
      <!-- Logo and Desktop Menu -->
      <div class="flex items-center gap-12">
        <NuxtLink class="flex items-center gap-3" to="/">
          <img :src="Logo" alt="Logo" class="w-10 h-10"/>
          <h1 class="text-2xl font-bold">Dreamly</h1>
        </NuxtLink>
        <div class="hidden sm:flex gap-8">
          <NuxtLink class="px-4 py-2 rounded-lg hover:bg-white dark:hover:bg-stone-800 transition-all text-lg"
                    to="/search">
            Features
          </NuxtLink>
          <NuxtLink class="px-4 py-2 rounded-lg hover:bg-white dark:hover:bg-stone-800 transition-all text-lg"
                    to="/search">
            Donate
          </NuxtLink>
          <NuxtLink class="px-4 py-2 rounded-lg hover:bg-white dark:hover:bg-stone-800 transition-all text-lg"
                    to="/calendar">
            About
          </NuxtLink>
        </div>
      </div>

      <!-- Auth Buttons / Mobile Menu -->
      <div class="flex items-stretch gap-4 ml-auto">
        <SecondaryButton class="" to="/login">Login</SecondaryButton>
        <PrimaryButton class=" font-semibold" to="/register">Register</PrimaryButton>
        <button class="sm:hidden" @click="open = !open">
          <MenuIcon class="w-6 h-6"/>
        </button>
      </div>
    </div>
  </Wrapper>
</template>

<script lang="ts" setup>
import Logo from '~/assets/images/logo.png'
import Wrapper from "~/components/static/Wrapper.vue";
</script>