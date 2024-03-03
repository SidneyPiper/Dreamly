<script setup>
definePageMeta({
    middleware: 'auth',
    auth: {
        unauthenticatedOnly: true,
        navigateAuthenticatedTo: '/',
    },
})
</script>

<template>

</template>