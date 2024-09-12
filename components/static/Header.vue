<template>
  <div
      class="flex items-center justify-between py-6">
    <!-- Logo and Desktop Menu -->
    <div class="flex items-center gap-12 h-12">
      <NuxtLink class="flex items-center gap-3" to="/">
        <img :src="Logo" alt="Logo" class="w-10 h-10 hidden sm:flex"/>
        <h1 class="text-2xl font-bold">Dreamly</h1>
      </NuxtLink>
    </div>

    <!-- Auth Buttons -->
    <div class="flex items-stretch gap-2 ml-auto">
      <SecondaryButton class="" to="/login">Login</SecondaryButton>
      <PrimaryButton class=" font-semibold" to="/register">Register</PrimaryButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Logo from '~/assets/images/logo.png'
</script>