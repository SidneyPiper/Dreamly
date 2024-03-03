<script setup>
definePageMeta({ middleware: 'auth' })
const { signOut } = useAuth()
</script>

<template>
    <h1>Protected</h1>
    <button @click="signOut({ callbackUrl: '/' })">Logout</button>
</template>