<template>
  <div class="flex flex-col items-center gap-4">
    <div class="text-center">
      <h2 class="text-2xl font-medium mb-1">Welcome back!</h2>
      <p class="text-gray-400">We&apos;re so excited to see you again!</p>
    </div>

    <div class="flex flex-col gap-5">
      <button
          class="flex text-gray-900 w-full bg-white py-3 rounded-lg focus:bg-gray-200 hover:bg-gray-100 justify-center items-center gap-3 font-semibold"
          @click="signIn('github')">
        <img alt="Github Invertocat" class="h-6" src="../assets/auth/github.svg">
        Login with GitHub
      </button>

      <span class="w-4/5 mx-auto h-1 bg-white dark:bg-gray-800 rounded-md"></span>

      <form class="flex flex-col gap-3"
            @submit.prevent="t = 'world'; signIn('credentials', { name, password })">
        <p>{{ t }}</p>
        <input v-model="name"
               class="block py-2.5 text-stone-950 w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
               placeholder="Username/Email" type="text">
        <input v-model="password"
               class="block py-2.5 text-stone-950 w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
               placeholder="Password" type="password">
        <PrimaryButton
            class="flex text-gray-900 w-full py-3 rounded-lg justify-center items-center gap-3 font-semibold">
          Login with credentials
        </PrimaryButton>
      </form>

      <p class="text-center">
        Need an account?
        <NuxtLink class="text-blue-400 ml-1 hover:underline" to="/register">
          Register
        </NuxtLink>
      </p>
    </div>

  </div>
</template>

<script lang="ts" setup>
const t = ref('Hello')

definePageMeta({
  middleware: 'auth',
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/profile',
  },
  layout: 'auth'
})

const {signIn} = useAuth()

const name = ref<string>('')
const password = ref<string>('')
</script>