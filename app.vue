<template>
  <NuxtLayout class="bg-cloud dark:bg-stone-800 text-stone-950 dark:text-cloud">
    <NuxtPage/>
  </NuxtLayout>
  <Notifications/>
</template>

<script lang="ts" setup>
import Notifications from "~/components/Notifications.vue";
</script>