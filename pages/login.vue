<script setup>
definePageMeta({
    middleware: 'auth',
    auth: {
        unauthenticatedOnly: true,
        navigateAuthenticatedTo: '/protected',
    },
})

const { signIn } = useAuth()

const username = ref('')
const password = ref('')
</script>

<template>
    <button @click="signIn('github')">Login with GitHub</button>
    <div>
        <input type="text" v-model="username">
        <input type="text" v-model="password">
        <button @click="signIn('credentials', { username, password })">Login with
            credentials</button>
    </div>
</template>