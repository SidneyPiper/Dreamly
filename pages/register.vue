<template>
  <div class="flex flex-col items-center gap-4">
    <div class="text-center">
      <h2 class="text-2xl font-medium mb-1">Nice to see you!</h2>
      <p class="text-gray-400">Start you Dreamly journey right here!</p>
    </div>

    <form class="flex flex-col gap-3 w-72" @submit.prevent="register">
      <Input v-model="name" placeholder="Username" type="text" :validate-fn="validateUsername"/>
      <Input v-model="email" placeholder="Email" type="email" :validate-fn="validateEmail"/>
      <Input v-model="password" placeholder="Password" type="password" @input="validatePasswordLive"
             :validate-fn="validatePassword"/>
      <ul>
        <li :class="passwordCriteria.minLength ? 'text-green-600' : ''">- Minimum 8 characters</li>
        <li :class="passwordCriteria.hasUpperCase ? 'text-green-600' : ''">- At least one uppercase letter</li>
        <li :class="passwordCriteria.hasLowerCase ? 'text-green-600' : ''">- At least one lowercase letter</li>
        <li :class="passwordCriteria.hasNumber? 'text-green-600' : ''">- At least one number</li>
        <li :class="passwordCriteria.hasSpecialChar ? 'text-green-600' : ''">- At least one special character</li>
      </ul>
      <PrimaryButton
          class="flex text-gray-900 w-full py-3 rounded-lg justify-center items-center gap-3 font-semibold"
          :disabled="!isFormValid">
        Register
      </PrimaryButton>
    </form>

    <p class="text-center">
      Already registered?
      <NuxtLink class="text-blue-400 ml-1 hover:underline" to="/login">
        Login
      </NuxtLink>
    </p>
  </div>
</template>

<script lang="ts" setup>
import {
  hasLowerCase,
  hasMinLength, hasNumber, hasSpecialChar,
  hasUpperCase,
  validateEmail, validatePassword,
  validateUsername
} from "~/shared/validation";

import {useNotificationsStore} from "stores/notifications";

const {notify} = useNotificationsStore()

definePageMeta({
  middleware: 'auth',
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/profile',
  },
  layout: 'auth'
})

const name = ref('')
const email = ref('')
const password = ref('')
let success = false

const passwordCriteria = reactive({
  minLength: false,
  hasUpperCase: false,
  hasLowerCase: false,
  hasNumber: false,
  hasSpecialChar: false,
});

const validatePasswordLive = () => {
  passwordCriteria.minLength = hasMinLength(password.value);
  passwordCriteria.hasUpperCase = hasUpperCase(password.value);
  passwordCriteria.hasLowerCase = hasLowerCase(password.value);
  passwordCriteria.hasNumber = hasNumber(password.value);
  passwordCriteria.hasSpecialChar = hasSpecialChar(password.value);
};

const isFormValid = computed(() => {
  return validateUsername(name.value) && validateEmail(email.value) && validatePassword(password.value)
})

async function register() {


  await $fetch('/api/auth/register', {
    method: 'POST',
    body: {
      name: name.value,
      email: email.value,
      password: password.value
    }
  }).then(async (response) => {
        notify(Level.SUCCESS, response.data.statusMessage)
        await navigateTo('/login')
      }
  ).catch((response) => {
    notify(Level.DANGER, response.data.statusMessage)
    return response
  })
}
</script>