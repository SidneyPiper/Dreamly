<template>
  <NuxtLayout class="bg-cloud dark:bg-stone-800 text-stone-950 dark:text-cloud fixed inset-0">
    <NuxtPage/>
  </NuxtLayout>

  <Notifications/>
</template>

<script lang="ts" setup>
import Notifications from "~/components/Notifications.vue";

onBeforeMount(() => {
  const color_mode = useColorMode()
  const metaThemeColor = document.querySelector("meta[name='theme-color']")

  if (color_mode.value == 'dark') {
    metaThemeColor?.setAttribute('content', '#1c1917')
  } else {
    metaThemeColor?.setAttribute('content', '#e5e8db')
  }
})


</script>