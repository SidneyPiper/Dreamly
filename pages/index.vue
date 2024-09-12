<template>
  <div class="px-4 w-dvw">
    <div class="mx-auto max-w-7xl">
      <StaticHeader/>
      <StaticHero/>
    </div>
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
