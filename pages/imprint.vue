<template>
  <div class="px-4 w-dvw">
    <div class="mx-auto max-w-7xl">
      <StaticHeader/>
      <ImprintContent/>
      <StaticFooter/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ImprintContent from "~/components/static/ImprintContent.vue";

definePageMeta({
  layout: "static",
  middleware: 'auth',
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/home',
  },
})
</script>
