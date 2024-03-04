<script setup lang="ts">
definePageMeta({ middleware: 'auth' })

const { signOut } = useAuth()
const { data } = await useFetch('/api/me')

const headers = useRequestHeaders(['cookie'])
const { data: token } = await useFetch('/api/token', { headers })
</script>

<template>
    <h1>Protected</h1>
    <p>Data: {{ data }}</p>
    <div>Token: {{ token }}</div>
    <button @click="signOut({ callbackUrl: '/' })">Logout</button>
</template>