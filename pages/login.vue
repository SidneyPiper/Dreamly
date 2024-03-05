<template>
    <button @click="signIn('github')">Login with GitHub</button>
    <form @submit.prevent="signIn('credentials', { name, password })">
        <input type="text" v-model="name" placeholder="Username/Email">
        <input type="password" v-model="password" placeholder="Password">
        <button>Login with credentials</button>
    </form>
    <NuxtLink to="/register">Register</NuxtLink>
</template>

<script setup lang="ts">
definePageMeta({
    middleware: 'auth',
    auth: {
        unauthenticatedOnly: true,
        navigateAuthenticatedTo: '/protected',
    },
})

const { signIn } = useAuth()

const name = ref('')
const password = ref('')
</script>