<template>
  <div class="flex flex-col grow p-4 h-full">
    <!-- Top bar -->
    <div class="flex justify-between items-center">
      <TextButton @click="$router.back()">Cancel</TextButton>
    </div>

    <form class="flex flex-col gap-3 my-4" @submit.prevent="changeEmail">
      <Input v-model="old_password" placeholder="Old Password" type="password"/>
      <Input v-model="new_password" placeholder="New Password" type="password" @input="validatePassword"
             :validate-fn="() => isPasswordValid"/>
      <PrimaryButton :disabled="!isPasswordValid">Save</PrimaryButton>
    </form>
    <ul>
      <li :class="passwordCriteria.minLength ? 'text-green-600' : ''">Minimum 8 characters</li>
      <li :class="passwordCriteria.hasUpperCase ? 'text-green-600' : ''">At least one uppercase letter</li>
      <li :class="passwordCriteria.hasLowerCase ? 'text-green-600' : ''">At least one lowercase letter</li>
      <li :class="passwordCriteria.hasNumber? 'text-green-600' : ''">At least one number</li>
      <li :class="passwordCriteria.hasSpecialChar ? 'text-green-600' : ''">At least one special character</li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import {useNotificationsStore} from "stores/notifications";
import {
  hasLowerCase,
  hasMinLength,
  hasNumber,
  hasSpecialChar,
  hasUpperCase,
  validatePassword as vp
} from "~/shared/validation";

const {notify} = useNotificationsStore()
const {signOut} = useAuth()

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

const old_password = ref<string>("")
const new_password = ref<string>("")

const passwordCriteria = reactive({
  minLength: false,
  hasUpperCase: false,
  hasLowerCase: false,
  hasNumber: false,
  hasSpecialChar: false,
});

const validatePassword = () => {
  passwordCriteria.minLength = hasMinLength(new_password.value);
  passwordCriteria.hasUpperCase = hasUpperCase(new_password.value);
  passwordCriteria.hasLowerCase = hasLowerCase(new_password.value);
  passwordCriteria.hasNumber = hasNumber(new_password.value);
  passwordCriteria.hasSpecialChar = hasSpecialChar(new_password.value);
};

const isPasswordValid = computed(() => {
  return vp(old_password.value) && Object.values(passwordCriteria).every(Boolean);
})

const changeEmail = async () => {
  await $fetch('/api/change/password', {
    method: 'POST',
    body: {
      password: new_password.value,
      old_password: old_password.value
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