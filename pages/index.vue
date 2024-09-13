<template>
  <div class="px-4 w-dvw">
    <div class="space-y-6 lg:space-y-16 mx-auto max-w-7xl">
      <StaticHeader/>
      <div class="space-y-32">
        <StaticHero/>
        <StaticReasons/>
        <StaticFeatures/>
        <StaticTeam/>
      </div>
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
