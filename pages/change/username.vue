<template>
  <div class="flex flex-col grow p-4 h-full">
    <!-- Top bar -->
    <div class="flex justify-between items-center">
      <TextButton @click="$router.back()">Cancel</TextButton>
    </div>

    <form class="flex flex-col gap-3 my-4" @submit.prevent="changeUsername">
      <Input v-model="new_username" placeholder="New Username" type="text" :validate-fn="validateUsername"/>
      <PrimaryButton :disabled="!isUsernameValid">Save</PrimaryButton>
    </form>
  </div>
</template>

<script lang="ts" setup>
import {useNotificationsStore} from "stores/notifications";
import {validateUsername} from "~/shared/validation";
import {useNavbarStore} from "stores/navbar";


const {notify} = useNotificationsStore()
const {signOut} = useAuth()

const viewport = await useViewport()
const navbarStore = useNavbarStore()

if (!viewport.isLessThan('lg')) navbarStore.showNavbar()
else navbarStore.hideNavbar()

watch(viewport.breakpoint, () => {
  if (!viewport.isLessThan('lg')) navbarStore.showNavbar()
  else navbarStore.hideNavbar()
})

definePageMeta({
  middleware: 'auth',
})

const new_username = ref<string>("")

const isUsernameValid = computed(() => {
  return validateUsername(new_username.value)
});

const changeUsername = async () => {
  await $fetch('/api/change/username', {
    method: 'POST',
    body: {
      name: new_username.value
    },
  }).then((response) => {
    notify(Level.SUCCESS, response.data.statusMessage)
    signOut()
  }).catch((response) => {
    notify(Level.DANGER, response.data.statusMessage)
    return response
  })

}
</script>