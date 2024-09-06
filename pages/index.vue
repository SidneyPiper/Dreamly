<template>
  <div class="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
    <StaticHeader/>
    <StaticHero/>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "static",
  middleware: 'auth',
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/home',
  },
})
</script>
