<template>
  <div class="flex flex-col grow p-4 h-full">
    <!-- Top bar -->
    <div class="flex justify-between items-center">
      <TextButton @click="$router.back()">Cancel</TextButton>
    </div>

    <form class="flex flex-col gap-3 my-4" @submit.prevent="changeEmail">
      <Input v-model="new_email" placeholder="New Email" type="text" :validate-fn="validateEmail"/>
      <Input v-model="new_email_confirm" placeholder="Repeat new Email" type="text" :validate-fn="() => isEmailValid"/>
      <PrimaryButton :disabled="!isEmailValid">Save</PrimaryButton>
    </form>
  </div>
</template>

<script lang="ts" setup>
import {useNotificationsStore} from "stores/notifications";
import {validateEmail} from "~/shared/validation";
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

const new_email = ref<string>("")
const new_email_confirm = ref<string>("")


const isEmailValid = computed(() => {
  return new_email.value == new_email_confirm.value && validateEmail(new_email.value)
});

const changeEmail = async () => {
  if (new_email.value !== new_email_confirm.value) return

  await $fetch('/api/change/email', {
    method: 'POST',
    body: {
      email: new_email.value
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