<template>
  <div class="flex flex-col items-center gap-4">
    <div class="text-center">
      <h2 class="text-2xl font-medium mb-1">Nice to see you!</h2>
      <p class="text-gray-400">Start you Dreamly journey right here!</p>
    </div>

    <form class="flex flex-col gap-3" @submit.prevent="register">
      <input v-model="name"
             class="block py-2.5 text-stone-950 w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
             placeholder="Username" type="text"/>
      <input v-model="email"
             class="block py-2.5 text-stone-950 w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
             placeholder="Email" type="email"/>
      <input v-model="password"
             class="block py-2.5 text-stone-950 w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
             placeholder="Password" type="password"/>
      <PrimaryButton class="flex text-gray-900 w-full py-3 rounded-lg justify-center items-center gap-3 font-semibold">
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

async function register() {
  success = await $fetch('/api/auth/register', {
    method: 'POST',
    body: {
      name: name.value,
      email: email.value,
      password: password.value
    }
  })

  if (success) {
    await navigateTo('/login')
  }
}
</script>