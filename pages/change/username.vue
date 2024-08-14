<template>
  <div class="flex flex-col grow p-4 h-full">
    <!-- Top bar -->
    <div class="flex justify-between items-center">
      <TextButton @click="$router.back()">Cancel</TextButton>
    </div>

    <form class="flex flex-col gap-3" @submit.prevent="changeUsername">
      <input v-model="new_username"
             class="block py-2.5 text-stone-950 w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
             placeholder="New Username" type="text">
      <PrimaryButton>Save</PrimaryButton>
    </form>
  </div>
</template>

<script lang="ts" setup>
import {useNotificationsStore} from "stores/notifications";

const {notify} = useNotificationsStore()

const viewport = await useViewport()

if (!viewport.isLessThan('lg')) setPageLayout('default')
else setPageLayout('fullscreen')

watch(viewport.breakpoint, () => {
  if (!viewport.isLessThan('lg')) setPageLayout('default')
  else setPageLayout('fullscreen')
})

definePageMeta({
  middleware: 'auth',
  layout: 'fullscreen',
  layoutTransition: {name: 'slide-up'},
})

const new_username = ref<string>("")

const changeUsername = async () => {
  await $fetch('/api/change/username', {
    method: 'POST',
    body: {
      name: new_username.value
    },
  }).then((response) => {
    notify(Level.SUCCESS, response.data.statusMessage)
    useRouter().back()
  }).catch((response) => {
    notify(Level.DANGER, response.data.statusMessage)
    return response
  })

}
</script>