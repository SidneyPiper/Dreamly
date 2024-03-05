<script setup>
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

<template>
    <button @click="signIn('github')">Login with GitHub</button>
    <div>
        <input type="text" v-model="name">
        <input type="text" v-model="password">
        <button @click="signIn('credentials', { name, password })">Login with
            credentials</button>
    </div>
    <NuxtLink to="/register">Register</NuxtLink>
</template>