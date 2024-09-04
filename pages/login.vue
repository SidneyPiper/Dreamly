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

      <span class="w-11/12 mx-auto h-1 bg-white dark:bg-gray-800 rounded-md"></span>

      <form class="flex flex-col gap-3 w-72"
            @submit.prevent="signIn('credentials', { name, password })">
        <Input v-model="name" placeholder="Email" type="text"/>
        <Input v-model="password" placeholder="Password" type="password"/>
        <PrimaryButton
            class="flex text-gray-900 w-full py-3 rounded-lg justify-center items-center gap-3 font-semibold"
            :disabled="!name || !password">
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